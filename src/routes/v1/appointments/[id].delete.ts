import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, DeleteAppointmentSchema);

  const client = await useSupabaseClient();

  const { error } = await client.from("appointments").delete().eq("id", id);

  if (error) {
    logger.error(error);
    return sendError(
      event,
      createError({ statusMessage: "Can not delete appointment" })
    );
  }

  setResponseStatus(event, 204, "No Content");
  return;
});

const DeleteAppointmentSchema = v.objectAsync({
  id: v.string([v.uuid()]),
});
