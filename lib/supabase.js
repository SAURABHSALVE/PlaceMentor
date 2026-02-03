import { createBrowserClient } from '@supabase/ssr'

function makeNullClient() {
  const noop = async () => ({ data: null, error: null })
  const authNoop = {
    // Provide the common auth methods used across the app so callers
    // don't crash during build or when env vars are missing.
    signUp: noop,
    signInWithPassword: noop,
    signOut: noop,
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (cb) => ({ data: { subscription: { unsubscribe: () => {} } } }),
  }

  return {
    from: () => ({ select: noop, insert: noop, update: noop, delete: noop }),
    auth: authNoop,
    storage: { from: () => ({ getPublicUrl: () => ({ publicURL: '' }) }) },
    rpc: noop,
  }
}

export function createClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()

  if (!/^https?:\/\//i.test(url) || !key) {
    // During build (or if env vars missing) return a safe no-op client to avoid build-time errors.
    // Real Supabase interactions will require proper env vars at runtime.
    console.warn('Supabase env vars missing or invalid; returning noop client')
    return makeNullClient()
  }

  return createBrowserClient(url, key)
}