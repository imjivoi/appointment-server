import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, SignUpSchema);

  const client = await useSupabaseClient();

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "customer",
      },
    },
  });

  if (error) {
    if (error.status === 400) {
      return sendError(
        event,
        createError({ statusMessage: "User already exists", statusCode: 400 })
      );
    }

    return sendError(
      event,
      createError({ statusMessage: "Something went wrong", statusCode: 500 })
    );
  }

  setCookie(event, "access-token", data.session.access_token);
  setCookie(event, "refresh-token", data.session.refresh_token);

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
    },
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    },
  };
});

const SignUpSchema = v.objectAsync({
  email: v.string([v.email()]),
  password: v.string([v.minLength(6), v.maxLength(20)]),
});
