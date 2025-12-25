import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uuhfmiptamruqyoxigki.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGZtaXB0YW1ydXF5b3hpZ2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2NTEyMTYsImV4cCI6MjA4MjIyNzIxNn0.Udq_mTdo3lAg2VoBEsnvyDKnCcZNKhrrJWmIZPWwHzA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);