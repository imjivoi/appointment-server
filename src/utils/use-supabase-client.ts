import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../db/database.types";

export const useSupabaseClient = async (): Promise<
  SupabaseClient<Database>
> => {
  const event = useEvent();

  // get settings from runtime config
  const {
    supabase: { url, key },
  } = useRuntimeConfig();

  let supabaseClient = event.context
    ._supabaseClient as SupabaseClient<Database>;

  // No need to recreate client if exists in request context
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(url, key, {
      auth: {
        detectSessionInUrl: false,
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    event.context._supabaseClient = supabaseClient;
  }

  // check for authorized session
  const { data } = await supabaseClient.auth.getSession();
  if (data?.session?.user?.aud !== "authenticated") {
    // create a session from cookies
    const accessToken = getCookie(event, `access-token`);
    const refreshToken = getCookie(event, `refresh-token`);

    if (!accessToken || !refreshToken) return supabaseClient;

    // Set session from cookies
    await supabaseClient.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  }
  return supabaseClient;
};

export const useSupabaseServiceRole = (): SupabaseClient<Database> => {
  const event = useEvent();

  const {
    supabase: { url, serviceRoleKey },
  } = useRuntimeConfig();

  // Make sure service key is set
  if (!serviceRoleKey) {
    throw new Error("Missing `SUPABASE_SERVICE_ROLE_KEY` in `.env`");
  }

  // No need to recreate client if exists in request context
  if (!event.context._supabaseServiceRole) {
    const auth = {
      detectSessionInUrl: false,
      persistSession: false,
      autoRefreshToken: false,
    };

    const supabaseClient = createClient<Database>(url, serviceRoleKey, {
      auth,
    });

    event.context._supabaseServiceRole = supabaseClient;
  }

  return event.context._supabaseServiceRole as SupabaseClient<Database>;
};
