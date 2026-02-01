'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Upload, 
  FileText, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Unlock,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
  BarChart3,
  Calendar,
  Lightbulb,
  Loader2
} from 'lucide-react'

const ROLES = [
  { id: 'data_analyst', name: 'Data Analyst' },
  { id: 'backend_developer', name: 'Backend Developer' },
  { id: 'frontend_developer', name: 'Frontend Developer' }
]

// Score color helper
const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-500'
  return 'text-red-600'
}

const getScoreBgColor = (score) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  if (score >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

// Landing Page Component
function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-red-500/20 text-red-400 border-red-500/30 px-4 py-1">
            No sugarcoating. Real feedback.
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Are You <span className="text-red-500">Actually</span> Ready for Placements?
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Get your real readiness score in 3 minutes. We analyze your resume against actual job requirements and tell you exactly where you stand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
              onClick={onGetStarted}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Resume & Get Score
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3 min</div>
              <div className="text-slate-500 text-sm">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">14 days</div>
              <div className="text-slate-500 text-sm">Action Plan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-slate-500 text-sm">Honest</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto mt-24 grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Target className="h-10 w-10 text-red-500 mb-2" />
              <CardTitle className="text-white">Role-Specific Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                We evaluate against actual skill maps for Data Analyst, Backend Dev, and Frontend Dev roles.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <AlertTriangle className="h-10 w-10 text-yellow-500 mb-2" />
              <CardTitle className="text-white">Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Know exactly what's missing from your resume and why it matters for recruiters.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Calendar className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle className="text-white">14-Day Action Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Get a structured plan to improve your placement readiness in just two weeks.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Preview */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Free</CardTitle>
                <CardDescription className="text-slate-400">Get your overall score</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Overall readiness score</li>
                  <li className="flex items-center text-slate-500"><Lock className="h-4 w-4 mr-2" /> Category breakdown</li>
                  <li className="flex items-center text-slate-500"><Lock className="h-4 w-4 mr-2" /> Gap analysis</li>
                  <li className="flex items-center text-slate-500"><Lock className="h-4 w-4 mr-2" /> 14-day action plan</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/50 to-slate-800/50 border-red-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Full Report</CardTitle>
                  <Badge className="bg-red-500">₹49</Badge>
                </div>
                <CardDescription className="text-slate-400">Everything you need</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Overall readiness score</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Category breakdown</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Detailed gap analysis</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> 14-day action plan</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Resume improvement tips</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Auth Form Component
function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        if (data.user) {
          onAuth(data.user)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        if (data.user) {
          onAuth(data.user)
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800/80 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">PlaceMentor</CardTitle>
          <CardDescription className="text-slate-400">
            {mode === 'signin' ? 'Sign in to continue' : 'Create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-700">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Dashboard Component
function Dashboard({ user, onSignOut }) {
  const [step, setStep] = useState(1) // 1: upload, 2: select role, 3: results
  const [file, setFile] = useState(null)
  const [resumeId, setResumeId] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [analysisId, setAnalysisId] = useState(null)
  const [isPaid, setIsPaid] = useState(false)
  const [expandedGaps, setExpandedGaps] = useState({})

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a PDF file only')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', user.id)

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResumeId(data.resumeId)
      setStep(2)
    } catch (err) {
      setError(err.message || 'Failed to upload resume')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedRole) {
      setError('Please select a role')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId,
          userId: user.id,
          role: selectedRole
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setAnalysis(data.analysis)
      setAnalysisId(data.analysisId)
      setStep(3)
    } catch (err) {
      setError(err.message || 'Failed to analyze resume')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/unlock-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisId,
          userId: user.id
        }),
      })

      if (response.ok) {
        setIsPaid(true)
      }
    } catch (err) {
      setError('Failed to unlock report')
    } finally {
      setLoading(false)
    }
  }

  const toggleGap = (index) => {
    setExpandedGaps(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const resetAnalysis = () => {
    setStep(1)
    setFile(null)
    setResumeId(null)
    setSelectedRole('')
    setAnalysis(null)
    setAnalysisId(null)
    setIsPaid(false)
    setExpandedGaps({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">PlaceMentor</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <User className="h-4 w-4" />
              <span className="text-sm">{user.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onSignOut} className="text-slate-400 hover:text-white">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-24 sm:w-32 h-1 mx-2 ${
                    step > s ? 'bg-red-600' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-slate-400">Upload</span>
            <span className="text-sm text-slate-400">Select Role</span>
            <span className="text-sm text-slate-400">Results</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-3xl mx-auto mb-6 bg-red-900/50 border-red-700">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Upload Resume */}
        {step === 1 && (
          <Card className="max-w-xl mx-auto bg-slate-800/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="h-5 w-5 text-red-500" />
                Upload Your Resume
              </CardTitle>
              <CardDescription className="text-slate-400">
                Upload a PDF file of your resume. We'll extract and analyze the content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FileText className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                    <p className="text-slate-300 mb-2">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-slate-500 text-sm">PDF only (Max 5MB)</p>
                  </label>
                </div>
                
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleUpload}
                  disabled={!file || loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Upload className="mr-2 h-4 w-4" /> Upload & Extract</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Role */}
        {step === 2 && (
          <Card className="max-w-xl mx-auto bg-slate-800/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-red-500" />
                Select Target Role
              </CardTitle>
              <CardDescription className="text-slate-400">
                Choose the role you're preparing for. We'll analyze your resume against role-specific requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {ROLES.map((role) => (
                      <SelectItem 
                        key={role.id} 
                        value={role.id}
                        className="text-white hover:bg-slate-600"
                      >
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleAnalyze}
                  disabled={!selectedRole || loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><BarChart3 className="mr-2 h-4 w-4" /> Analyze Resume</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {step === 3 && analysis && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Overall Score */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-lg text-slate-400 mb-2">Your Placement Readiness Score</h2>
                  <div className={`text-7xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                    {analysis.overall_score}
                  </div>
                  <div className="text-slate-500 mt-2">out of 100</div>
                  <Progress 
                    value={analysis.overall_score} 
                    className="mt-4 h-3 bg-slate-700"
                  />
                  <p className="text-slate-400 mt-4">
                    {analysis.overall_score >= 80 ? "You're well prepared! Focus on fine-tuning." :
                     analysis.overall_score >= 60 ? "Good foundation, but gaps exist. Work on them." :
                     analysis.overall_score >= 40 ? "Significant improvements needed. Follow the action plan." :
                     "Major gaps identified. Intensive preparation required."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Locked Content Notice */}
            {!isPaid && (
              <Card className="bg-gradient-to-r from-red-900/30 to-slate-800/50 border-red-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="h-6 w-6 text-red-400" />
                      <div>
                        <h3 className="text-white font-medium">Unlock Full Report</h3>
                        <p className="text-slate-400 text-sm">Get detailed analysis, gap breakdown, and 14-day action plan</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleUnlock}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Unlock className="mr-2 h-4 w-4" /> Unlock for ₹49</>}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Category Scores - Locked/Unlocked */}
            <Card className={`bg-slate-800/80 border-slate-700 ${!isPaid ? 'opacity-60' : ''}`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-red-500" />
                  Category Breakdown
                  {!isPaid && <Lock className="h-4 w-4 text-slate-500 ml-2" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-4">
                    {Object.entries(analysis.category_scores || {}).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className={`font-bold ${getScoreColor(value)}`}>{value}</span>
                        </div>
                        <Progress value={value} className="h-2 bg-slate-700" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Unlock to see detailed category scores</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gap Analysis - Locked/Unlocked */}
            <Card className={`bg-slate-800/80 border-slate-700 ${!isPaid ? 'opacity-60' : ''}`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Gap Analysis
                  {!isPaid && <Lock className="h-4 w-4 text-slate-500 ml-2" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-3">
                    {(analysis.gap_analysis || []).map((gap, index) => (
                      <div key={index} className="border border-slate-700 rounded-lg overflow-hidden">
                        <button
                          className="w-full px-4 py-3 flex items-center justify-between bg-slate-700/50 hover:bg-slate-700 transition-colors"
                          onClick={() => toggleGap(index)}
                        >
                          <span className="text-white font-medium">{gap.area}</span>
                          {expandedGaps[index] ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </button>
                        {expandedGaps[index] && (
                          <div className="px-4 py-3 space-y-2 bg-slate-800/50">
                            <div>
                              <span className="text-red-400 text-sm font-medium">Issue: </span>
                              <span className="text-slate-300">{gap.issue}</span>
                            </div>
                            <div>
                              <span className="text-yellow-400 text-sm font-medium">Why it matters: </span>
                              <span className="text-slate-300">{gap.why_it_matters}</span>
                            </div>
                            <div>
                              <span className="text-green-400 text-sm font-medium">How to fix: </span>
                              <span className="text-slate-300">{gap.how_to_fix}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Unlock to see detailed gap analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 14-Day Action Plan - Locked/Unlocked */}
            <Card className={`bg-slate-800/80 border-slate-700 ${!isPaid ? 'opacity-60' : ''}`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  14-Day Action Plan
                  {!isPaid && <Lock className="h-4 w-4 text-slate-500 ml-2" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPaid ? (
                  <div className="space-y-4">
                    {(analysis['14_day_action_plan'] || []).map((phase, index) => (
                      <div key={index} className="border-l-2 border-red-500 pl-4">
                        <h4 className="text-white font-medium mb-2">{phase.day_range}</h4>
                        <ul className="space-y-1">
                          {(phase.tasks || []).map((task, taskIndex) => (
                            <li key={taskIndex} className="text-slate-300 flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Unlock to see your personalized action plan</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Resume Improvement - Locked/Unlocked */}
            {isPaid && analysis.resume_improvement_suggestion && (
              <Card className="bg-slate-800/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Resume Improvement Suggestion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{analysis.resume_improvement_suggestion}</p>
                </CardContent>
              </Card>
            )}

            {/* Analyze Another */}
            <div className="text-center">
              <Button 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={resetAnalysis}
              >
                Analyze Another Resume
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Main App Component
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setShowAuth(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    )
  }

  if (!user && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />
  }

  if (!user && showAuth) {
    return <AuthForm onAuth={(u) => setUser(u)} />
  }

  return <Dashboard user={user} onSignOut={handleSignOut} />
}