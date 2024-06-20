import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://mzptejcwohmguzbdkskf.supabase.co";
const supabaseUrl = import.meta.env.VITE_SUPABASE_API_BASE_URI;
const supabaseKey = import.meta.env.VITE_SUPABASE_SECRET;

export const supabase = createClient(supabaseUrl, supabaseKey);
