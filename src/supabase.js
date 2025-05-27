import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://kpxqxoiqspouheopmdki.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtweHF4b2lxc3BvdWhlb3BtZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTM2MjEsImV4cCI6MjA1NDI2OTYyMX0.zUZzvDdjZ0m0TPUeDkaFh37_ZxRvRPm7I3OKldqWVZY"

export const supabase = createClient( SUPABASE_URL, SUPABASE_ANON_KEY )