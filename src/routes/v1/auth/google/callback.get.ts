export default defineEventHandler(async (event) => {
  const user = await supabaseUser();

  return {};
});
