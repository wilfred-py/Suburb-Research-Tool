import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SERVICE_KEY || "";

const supabase = createClient(supabaseUrl, SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

// Access auth admin api
export const adminAuthClient = supabase.auth.admin;
