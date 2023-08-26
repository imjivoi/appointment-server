export default defineEventHandler(async () => {
  const user = await useSupabaseUser();
  const client = await useSupabaseClient();

  return client
    .from("businesses")
    .select("*, business_user(*)")
    .eq("business_user.user_id", user.id);
});
