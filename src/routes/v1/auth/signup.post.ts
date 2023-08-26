export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody(event)) as {
    email: string;
    password: string;
  };

  const client = await useSupabaseClient();

  const response = await client.auth.signUp({
    email,
    password,
  });

  return response;
});
