import { createClient } from '@supabase/supabase-js'

// Plain Supabase client for server-side reads — no cookies, no auth needed
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}
