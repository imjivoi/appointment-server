export async function getMyBusinesses() {
  const client = await supabaseClient();
  const user = await supabaseUser();

  return client
    .from("businesses")
    .select("*, business_user(*)")
    .eq("business_user.user_id", user.id);
}
