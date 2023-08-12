import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supaClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
    },
});

export const supabase = supaClient;
