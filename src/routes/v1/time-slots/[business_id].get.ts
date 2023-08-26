import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { business_id } = await useValidatedParams(event, GetTimeSlotsSchema);

  const client = await useSupabaseClient();

  const { data, error } = await client
    .from("time_slots")
    .select()
    .eq("business_id", business_id);

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not get time slots" })
    );
  }

  return data;
});

const GetTimeSlotsSchema = v.objectAsync({
  business_id: v.string([v.uuid()]),
});
