import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta as any).env.NEXT_SUPABASE_API_URL;
const supabaseKey = (import.meta as any).env.NEXT_SUPABASE_ANON_KEY;

export const supaClient = createClient(supabaseUrl, supabaseKey);
