export default defineEventHandler(async (event) => {
  const { email, password } = (await readBody(event)) as {
    email: string;
    password: string;
  };

  const client = await supabaseClient();

  const response = await client.auth.signInWithPassword({
    email,
    password,
  });

  return response;
});
