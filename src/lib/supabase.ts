import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://puvshraotchattjriccv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dnNocmFvdGNoYXR0anJpY2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODcxMzYsImV4cCI6MjA4ODU2MzEzNn0.1do617OmXTgL4vgIMwq_Y9TuEO18XScVEqJaBuLbwyE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
