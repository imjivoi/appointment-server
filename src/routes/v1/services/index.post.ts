import * as v from "valibot";
import { generateSlug } from "../../../utils/generate-slug";

export default defineBusinessRoleEventHandler(async (event, user) => {
  const { name, description, business_id } = await useValidatedBody(
    event,
    CreateServiceSchema
  );

  const client = await useSupabaseClient();

  //**Check  if owner of business_id business*/
  const { data: businessOwnerData, error: businessOwnerError } = await client
    .from("business_user")
    .select("user_id")
    .eq("business_id", business_id)
    .eq("user_id", user.id);

  if (businessOwnerError || !businessOwnerData?.length) {
    return sendError(
      event,
      createError({
        statusMessage: "Forbidden. You are not business owner",
        statusCode: 403,
      })
    );
  }

  const slug = generateSlug(name);
  const { data, error } = await client
    .from("services")
    .insert({ name, description, slug, business_id })
    .select()
    .single();

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
