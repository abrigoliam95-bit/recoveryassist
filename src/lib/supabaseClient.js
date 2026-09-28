import { createClient } from '@supabase/supabase-js'

// These come from your Supabase project settings.
// Never write the real keys directly in code — use a .env file instead.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
