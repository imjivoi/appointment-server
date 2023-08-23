export const supabaseUser = async () => {
  const event = useEvent();
  const client = await supabaseClient();

  const {
    data: { user: supabaseUser },
    error,
  } = await client.auth.getUser();

  if (error) {
    throw createError({ statusMessage: error?.message });
  }

  event.context._user = error ? null : supabaseUser;
  return event.context._user;
};
