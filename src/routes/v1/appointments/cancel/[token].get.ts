import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { token } = await useValidatedParams(event, CancelAppointmentSchema);

  const client = await useSupabaseClient();

  const { data: appointmentToken, error } = await client
    .from("appointment_tokens")
    .select()
    .eq("token", token)
    .maybeSingle();

  if (error) {
    logger.error(error)
    return sendError(
      event,
      createError({
        statusMessage: "Something went wrong",
        statusCode: 500,
      })
    );
  }

  if (!appointmentToken) {
    return sendError(
      event,
      createError({
        statusMessage: "Appointment not found",
        statusCode: 404,
      })
    );
  }

  const { error: updateAppointmentError } = await client
    .from("appointments")
    .update({
      canceled: true,
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", appointmentToken.appointment_id);

  if (updateAppointmentError) {
    logger.error(updateAppointmentError);
    return sendError(
      event,
      createError({
        statusMessage: "Can not cancel appointment",
        statusCode: 500,
      })
    );
  }
  const { error: deleteTokenError } = await client
    .from("appointment_tokens")
    .delete()
    .eq("token", token);

  setResponseStatus(event, 201);
  return;
});

const CancelAppointmentSchema = v.objectAsync({
  token: v.string(),
});
