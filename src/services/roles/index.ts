export async function createRoleUser(roleId: string, userId: string) {
  const client = await supabaseClient();
  return client
    .from("role_user")
    .insert({ role_id: roleId, user_id: userId })
    .select();
}

export async function getRoles() {
  const client = await supabaseClient();
  return client.from("roles").select("*");
}
