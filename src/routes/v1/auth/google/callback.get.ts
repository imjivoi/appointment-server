import { client } from "../../../../db/client";

export default defineEventHandler(async (event) => {
  const access_token = getCookie(event, "sb-access-token");
  const refresh_token = getCookie(event, "sb-refresh-token");

  const response = await client.auth.setSession({
    access_token,
    refresh_token,
  });

  return response.data;
});
