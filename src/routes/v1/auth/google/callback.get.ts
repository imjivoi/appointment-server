export default defineEventHandler(async (event) => {
  const user = await useSupabaseUser();

  return {};
});
