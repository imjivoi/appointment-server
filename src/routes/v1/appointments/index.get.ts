import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { id, start_at, end_at } = await useValidatedParams(
    event,
    GetAppointmentSchema
  );

  const client = await useSupabaseClient();

  const query = client.from("appointments").select();

  if (id) {
    query.eq("id", id);
  }

  if (start_at) {
    query.gte("start_at", start_at);
  }

  if (end_at) {
    query.lte("end_at", end_at);
  }

  const { data: appointment, error } = await query;

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not get appointment" })
    );
  }

  return appointment;
});

const GetAppointmentSchema = v.objectAsync({
  id: v.string([v.uuid()]),
  start_at: v.optional(v.string([v.isoTimestamp()])),
  end_at: v.optional(v.string([v.isoTimestamp()])),
});
