import { NextResponse } from 'next/server'

export async function GET() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()

  // Basic validity checks, do NOT return keys or sensitive data
  const hasSupabaseUrl = /^https?:\/\//i.test(url)
  const hasSupabaseKey = key.length > 0

  return NextResponse.json({
    hasSupabaseUrl,
    hasSupabaseKey,
    // helpful hint for debugging (not the value): length of values
    supabaseUrlLength: url.length,
    supabaseKeyLength: key.length
  })
}
