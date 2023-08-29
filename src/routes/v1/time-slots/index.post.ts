import * as v from "valibot";

export default defineBusinessRoleEventHandler(async (event, user) => {
  const { business_id, service_id, slots } = await useValidatedBody(
    event,
    CreateTimeSlotSchema
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

  const insertData = slots.map((slot: Slot) => ({
    ...slot,
    business_id,
    service_id,
  }));

  const { data, error } = await client
    .from("time_slots")
    .insert(insertData)
    .select();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create time slot" })
    );
  }

  return data;
});

const SlotSchema = v.nonOptional(
  v.object({
    start_at: v.string([v.isoTimestamp()]),
    end_at: v.string([v.isoTimestamp()]),
  })
);

type Slot = Required<v.Input<typeof SlotSchema>>;

const CreateTimeSlotSchema = v.objectAsync({
  slots: v.array(SlotSchema),
  service_id: v.string([v.uuid()]),
  business_id: v.string([v.uuid()]),
});
