import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { name, description, slug, category_id } = await useValidatedBody(
    event,
    UpdateBusinessSchema
  );

  const client = await useSupabaseClient();

  const { data, error } = await client
    .from("businesses")
    .update({ name, description, slug, category_id })
    .select()
    .single();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not update business" })
    );
  }
  return data;
});

const UpdateBusinessSchema = v.objectAsync({
  name: v.string([v.minLength(3), v.maxLength(50)]),
  description: v.optional(v.string([v.minLength(3), v.maxLength(200)])),
  slug: v.string([v.minLength(3), v.maxLength(50)]),
  category_id: v.optional(v.string([v.uuid()])),
});
