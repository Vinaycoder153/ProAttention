import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwiyyqefoznxsqkbhsce.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aXl5cWVmb3pueHNxa2Joc2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzE2MzAsImV4cCI6MjA2OTM0NzYzMH0.izssIZ_Yf1Ek3sUNexrGQs0FC462NWLeop1_eoHRges';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);