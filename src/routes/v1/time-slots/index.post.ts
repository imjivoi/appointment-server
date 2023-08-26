import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { business_id, start_at, end_at } = await useValidatedBody(
    event,
    CreateTimeSlotSchema
  );

  const client = await useSupabaseClient();

  const { data, error } = await client
    .from("time_slots")
    .insert({ business_id, start_at, end_at })
    .select()
    .single();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create time slot" })
    );
  }

  return data;
});

const CreateTimeSlotSchema = v.objectAsync({
  start_at: v.string([v.isoTimestamp()]),
  end_at: v.string([v.isoTimestamp()]),
  business_id: v.string([v.uuid()]),
});
