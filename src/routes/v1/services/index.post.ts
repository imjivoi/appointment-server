import * as v from "valibot";
import { generateSlug } from "../../../utils/generate-slug";

export default defineEventHandler(async (event) => {
  const { name, description, business_id } = await useValidatedBody(
    event,
    CreateServiceSchema
  );

  const client = await useSupabaseClient();

  const slug = generateSlug(name);
  const { data, error } = await client
    .from("services")
    .insert({ name, description, slug, business_id })
    .select()
    .single();
  console.log(error);
  if (error) {
    if (error.code === "23503") {
      return sendError(
        event,
        createError({
          statusMessage: "Business with this id does'n exist",
          statusCode: 404,
        })
      );
    }
    return sendError(
      event,
      createError({ statusMessage: "Can not create service" })
    );
  }

  return data;
});

const CreateServiceSchema = v.objectAsync({
  name: v.string([v.minLength(3), v.maxLength(50)]),
  description: v.optional(v.string([v.minLength(3), v.maxLength(200)])),
  business_id: v.string([v.uuid()]),
});
