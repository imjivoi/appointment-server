import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { name, description, slug } = await useValidatedBody(
    event,
    CreateBusinessSchema
  );
  const user = await useSupabaseUser();
  const client = await useSupabaseClient();

  const { data: businessData, error: businessError } = await client
    .from("businesses")
    .insert([{ name, description, slug }])
    .select()
    .single();

  if (businessError || !businessData) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create bussiness" })
    );
  }

  const { error } = await client
    .from("business_user")
    .insert([{ user_id: user.id, business_id: businessData.id }]);

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create bussiness" })
    );
  }

  return businessData;
});

const CreateBusinessSchema = v.objectAsync({
  name: v.string([v.minLength(3), v.maxLength(50)]),
  description: v.optional(v.string([v.minLength(3), v.maxLength(200)])),
  slug: v.string([v.minLength(3), v.maxLength(50)]),
  category_id: v.optional(v.string([v.uuid()])),
});
