import * as v from "valibot";

//** Сделать проверку запсией на текущий день и сгенерировать доступные слоты*/

export default defineEventHandler(async (event) => {
  const { service_id, day } = await useValidatedQuery(
    event,
    GetAvailableTimeSlotsSchema
  );

  const client = await useSupabaseClient();

  const query = client
    .from("appointment")
    .select()
    .eq("service_id", service_id)
    .is("appointment", null)
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true });

  const { data, error } = await query;

  if (error) {
    logger.error(error);
    return sendError(
      event,
      createError({ statusMessage: "Can not get time slots" })
    );
  }

  return data;
});

const GetAvailableTimeSlotsSchema = v.objectAsync({
  service_id: v.string([v.uuid()]),
  day: v.transform(v.date(), (value) => new Date(value)),
});
