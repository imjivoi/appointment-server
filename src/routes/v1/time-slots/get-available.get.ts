import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { business_id, service_id } = await useValidatedQuery(
    event,
    GetAvailableTimeSlotsSchema
  );

  const client = await useSupabaseClient();

  const query = client.from("time_slots").select('*, appointment:appointments()').is("appointment", null);

  if (service_id) {
    query.eq("service_id", service_id);
  }

  if (business_id) {
    query.eq("business_id", business_id);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error)
    return sendError(
      event,
      createError({ statusMessage: "Can not get time slots" })
    );
  }

  return data;
});

const GetAvailableTimeSlotsSchema = v.objectAsync({
  business_id: v.optional(v.string([v.uuid()])),
  service_id: v.string([v.uuid()]),
});
