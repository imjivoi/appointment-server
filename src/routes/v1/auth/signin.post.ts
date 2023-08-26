import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, SignInSchema);

  const client = await useSupabaseClient();

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.status === 400) {
      return sendError(
        event,
        createError({
          statusMessage:
            "Ivalid login credentials. Please check your email and password",
          statusCode: 400,
        })
      );
    }

    return sendError(
      event,
      createError({ statusMessage: "Something went wrong", statusCode: 500 })
    );
  }

  setCookie(event, "sb-access-token", data.session.access_token);
  setCookie(event, "sb-refresh-token", data.session.refresh_token);

  return data;
});

const SignInSchema = v.objectAsync({
  email: v.string([v.email()]),
  password: v.string(),
});
