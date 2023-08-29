export default defineAuthEventHandler(async (event) => {
  const client = await useSupabaseClient();

  const { data, error } = await client.from("categories").select();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not get categories" })
    );
  }

  return data;
});
