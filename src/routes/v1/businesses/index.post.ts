import * as v from "valibot";
import { generateSlug } from "../../../utils/generate-slug";

export default defineEventHandler(async (event) => {
  const { name, description, category_id } = await useValidatedBody(
    event,
    CreateBusinessSchema
  );
  const user = await useSupabaseUser();
  const client = await useSupabaseClient();

  const slug = generateSlug(name);

  const { data: businessData, error: businessError } = await client
    .from("businesses")
    .insert([{ name, description, slug, category_id }])
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
  category_id: v.string([v.uuid()]),
});
