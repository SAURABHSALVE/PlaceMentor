import { createClient } from '@supabase/supabase-js'

function makeNullClient() {
  const noop = async () => ({ data: null, error: null })
  return {
    from: () => ({ select: noop, insert: noop, update: noop, delete: noop }),
    auth: { signIn: noop, signOut: noop },
    rpc: noop,
    storage: { from: () => ({ getPublicUrl: () => ({ publicURL: '' }) }) },
  }
}

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!/^https?:\/\//i.test(url) || !key) {
    console.warn('Supabase env vars missing or invalid; returning noop server client')
    return makeNullClient()
  }

  return createClient(url, key)
}