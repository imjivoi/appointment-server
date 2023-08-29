export default defineBusinessRoleEventHandler(async (event, user) => {
  const client = await useSupabaseClient();

  const { data, error } = await client
    .from("businesses")
    .select("*, users:business_user!inner(user_id)")
    .eq("business_user.user_id", user.id);

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not get businesses" })
    );
  }

  return data;
});
