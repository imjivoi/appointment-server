export default defineEventHandler(async () => {
  const user = await useSupabaseUser();
  const client = await useSupabaseClient();

  return client
    .from("businesses")
    .select("*, users:business_user!inner(user_id)")
    .eq("business_user.user_id", user.id);
});
