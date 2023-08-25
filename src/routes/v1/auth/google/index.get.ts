import { client } from "../../../../db/client";

export default defineEventHandler(async (event) => {
  const response = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.SUPABASE_AUTH_INTERNAL_GOOGLE_REDIRECT,
      queryParams: {
        role: "customer",
      },
    },
  });
  return sendRedirect(event, response.data.url);
});
