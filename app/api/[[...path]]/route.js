import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createServerClient } from '@/lib/supabase-server'
import { openaiClient, MODEL } from '@/lib/openai'
import { SKILL_MAPS } from '@/lib/skillMaps'

// CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function handleCORS(response) {
  const headers = corsHeaders()
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Main route handler
export async function GET(request, { params }) {
  const pathSegments = params?.path || []
  const path = '/' + pathSegments.join('/')

  try {
    // Health check
    if (path === '/health') {
      return handleCORS(NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }))
    }

    // Get roles
    if (path === '/roles') {
      const roles = Object.entries(SKILL_MAPS).map(([id, data]) => ({
        id,
        name: data.name
      }))
      return handleCORS(NextResponse.json({ roles }))
    }

    // Get user's analyses
    if (path === '/analyses') {
      const { searchParams } = new URL(request.url)
      const userId = searchParams.get('userId')
      
      if (!userId) {
        return handleCORS(NextResponse.json({ error: 'userId required' }, { status: 400 }))
      }

      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false })

      if (error) {
        console.error('Error fetching analyses:', error)
        return handleCORS(NextResponse.json({ error: error.message }, { status: 500 }))
      }

      return handleCORS(NextResponse.json({ analyses: data || [] }))
    }

    // Get single analysis
    if (path.startsWith('/analysis/')) {
      const analysisId = pathSegments[1]
      const supabase = createServerClient()
      
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', analysisId)
        .single()

      if (error) {
        return handleCORS(NextResponse.json({ error: 'Analysis not found' }, { status: 404 }))
      }

      return handleCORS(NextResponse.json({ analysis: data }))
    }

    return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (error) {
    console.error('GET Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export async function POST(request, { params }) {
  const pathSegments = params?.path || []
  const path = '/' + pathSegments.join('/')

  try {
    // Upload resume and extract text
    if (path === '/upload-resume') {
      const formData = await request.formData()
      const file = formData.get('file')
      const userId = formData.get('userId')

      if (!file || !userId) {
        return handleCORS(NextResponse.json({ error: 'File and userId required' }, { status: 400 }))
      }

      // Check if PDF
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        return handleCORS(NextResponse.json({ error: 'Only PDF files are accepted' }, { status: 400 }))
      }

      // Extract text from PDF
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      let extractedText = ''
      try {
        const pdfData = await pdf(buffer)
        extractedText = pdfData.text
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError)
        return handleCORS(NextResponse.json({ error: 'Failed to parse PDF. Please ensure the file is not corrupted.' }, { status: 400 }))
      }

      if (!extractedText || extractedText.trim().length < 50) {
        return handleCORS(NextResponse.json({ error: 'Could not extract enough text from PDF. Please ensure the resume contains readable text.' }, { status: 400 }))
      }

      // Save to database
      const supabase = createServerClient()
      const resumeId = uuidv4()
      
      const { error } = await supabase
        .from('resumes')
        .insert([{
          id: resumeId,
          userId: userId,
          filename: file.name,
          extractedText: extractedText,
          createdAt: new Date().toISOString()
        }])

      if (error) {
        console.error('Database error:', error)
        return handleCORS(NextResponse.json({ error: 'Failed to save resume' }, { status: 500 }))
      }

      return handleCORS(NextResponse.json({ 
        success: true, 
        resumeId,
        textLength: extractedText.length,
        message: 'Resume uploaded and text extracted successfully'
      }))
    }

    // Analyze resume
    if (path === '/analyze') {
      const body = await request.json()
      const { resumeId, userId, role } = body

      if (!resumeId || !userId || !role) {
        return handleCORS(NextResponse.json({ error: 'resumeId, userId, and role required' }, { status: 400 }))
      }

      // Get resume text
      const supabase = createServerClient()
      const { data: resume, error: resumeError } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single()

      if (resumeError || !resume) {
        return handleCORS(NextResponse.json({ error: 'Resume not found' }, { status: 404 }))
      }

      // Get skill map for role
      const skillMap = SKILL_MAPS[role]
      if (!skillMap) {
        return handleCORS(NextResponse.json({ error: 'Invalid role' }, { status: 400 }))
      }

      // Prepare prompt for GPT
      const systemPrompt = `You are a strict placement readiness evaluator. Analyze the resume against the target role requirements. Be brutally honest, avoid motivational language. Output ONLY valid JSON.

Target Role: ${skillMap.name}

Required Skills:
${Object.entries(skillMap.skills).map(([key, skill]) => `- ${skill.name} (${skill.weight}% weight): Look for ${skill.keywords.join(', ')}`).join('\n')}

You must return EXACTLY this JSON structure:
{
  "overall_score": <0-100 integer>,
  "category_scores": {
    "technical_skills": <0-100>,
    "project_depth": <0-100>,
    "industry_readiness": <0-100>,
    "resume_strength": <0-100>
  },
  "gap_analysis": [
    {
      "area": "<skill area>",
      "issue": "<specific problem>",
      "why_it_matters": "<why this matters for the role>",
      "how_to_fix": "<actionable fix>"
    }
  ],
  "14_day_action_plan": [
    {
      "day_range": "Day 1-3",
      "tasks": ["task1", "task2"]
    },
    {
      "day_range": "Day 4-7",
      "tasks": ["task1", "task2"]
    },
    {
      "day_range": "Day 8-11",
      "tasks": ["task1", "task2"]
    },
    {
      "day_range": "Day 12-14",
      "tasks": ["task1", "task2"]
    }
  ],
  "resume_improvement_suggestion": "<specific resume improvement advice>"
}`

      const userPrompt = `Analyze this resume for ${skillMap.name} role:\n\n${resume.extractedText.substring(0, 4000)}`

      // Call OpenAI
      let analysisResult
      try {
        const response = await openaiClient.chat.completions.create({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3,
          max_tokens: 2000
        })

        const content = response.choices[0].message.content
        analysisResult = JSON.parse(content)
      } catch (aiError) {
        console.error('OpenAI error:', aiError)
        return handleCORS(NextResponse.json({ error: 'AI analysis failed. Please try again.' }, { status: 500 }))
      }

      // Save analysis to database
      const analysisId = uuidv4()
      const { error: saveError } = await supabase
        .from('analyses')
        .insert([{
          id: analysisId,
          userId: userId,
          resumeId: resumeId,
          role: role,
          overallScore: analysisResult.overall_score,
          fullReport: analysisResult,
          isPaid: false,
          createdAt: new Date().toISOString()
        }])

      if (saveError) {
        console.error('Save error:', saveError)
        return handleCORS(NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 }))
      }

      return handleCORS(NextResponse.json({
        success: true,
        analysisId,
        analysis: analysisResult
      }))
    }

    // Unlock full report (simulate payment)
    if (path === '/unlock-report') {
      const body = await request.json()
      const { analysisId, userId } = body

      if (!analysisId || !userId) {
        return handleCORS(NextResponse.json({ error: 'analysisId and userId required' }, { status: 400 }))
      }

      const supabase = createServerClient()
      const { error } = await supabase
        .from('analyses')
        .update({ isPaid: true })
        .eq('id', analysisId)
        .eq('userId', userId)

      if (error) {
        return handleCORS(NextResponse.json({ error: 'Failed to unlock report' }, { status: 500 }))
      }

      return handleCORS(NextResponse.json({ success: true, message: 'Report unlocked' }))
    }

    return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (error) {
    console.error('POST Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}