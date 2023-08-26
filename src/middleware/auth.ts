export default defineEventHandler(async (event) => {
  if (!getRequestURL(event).pathname.startsWith("/v1/auth")) {
    const user = await useSupabaseUser().catch((err) => {});

    if (!user) {
      return sendError(
        event,
        createError({ statusMessage: "Unauthorized", statusCode: 401 })
      );
    }
  }
});
