import * as v from "valibot";

import { generateSlug } from "../../../utils/generate-slug";
import { DEFAULT_TIME_SLOTS } from "../../../constants";

export default defineBusinessRoleEventHandler(async (event, user) => {
  const { name, description, business_id, duration } = await useValidatedBody(
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
    .insert({ name, description, slug, business_id, duration })
    .select()
    .single();

  if (error) {
    logger.error(error.message);
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

  // creating default time slots
  const timeSlotsWithServiceId = DEFAULT_TIME_SLOTS.map((timeSlot) => ({
    service_id: data.id,
    ...timeSlot,
  }));
  const { error: timeSlotsError } = await client
    .from("time_slots")
    .insert(timeSlotsWithServiceId);

  if (timeSlotsError) {
    logger.error(timeSlotsError.message);
  }
  return data;
});

const CreateServiceSchema = v.objectAsync({
  name: v.string([v.minLength(3), v.maxLength(50)]),
  description: v.optional(v.string([v.minLength(3), v.maxLength(200)])),
  business_id: v.string([v.uuid()]),
  duration: v.coerce(v.number([v.minValue(1), v.maxValue(600)]), Number),
});
