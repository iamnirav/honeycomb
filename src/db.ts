import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://facvpdffbqndenkbtrtp.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY3ZwZGZmYnFuZGVua2J0cnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzM2ODYsImV4cCI6MjAyOTY0OTY4Nn0.5DEaMpOWu0bJz9ULl7eqxa9lMJ-tG7tYX37R7xVkAoE'

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
