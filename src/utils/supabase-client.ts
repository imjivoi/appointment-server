import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabaseClient = async <T>(): Promise<SupabaseClient<T>> => {
  const event = useEvent();

  // get settings from runtime config
  const {
    supabase: { url, key },
  } = useRuntimeConfig();

  let supabaseClient = event.context._supabaseClient as SupabaseClient<T>;

  // No need to recreate client if exists in request context
  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
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
    const accessToken = getCookie(event, `sb-access-token`);
    const refreshToken = getCookie(event, `sb-refresh-token`);

    if (!accessToken || !refreshToken) return supabaseClient;

    // Set session from cookies
    await supabaseClient.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  }
  return supabaseClient;
};
