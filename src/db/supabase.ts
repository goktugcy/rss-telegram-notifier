import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface EnvBindings {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

export function createSupabaseClient(env: EnvBindings): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
}
