import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://iieuhsjoxeicrtazbcis.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZXVoc2pveGVpY3J0YXpiY2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNDg3MTEsImV4cCI6MjA5MzgyNDcxMX0.7jTT6wnJjGZx7mcsUAr49Z4r5mW-qG9GRBJaxv2lUtE'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Teste temporário — apague depois
console.log('Supabase iniciado:', !!supabase)