import * as v from "valibot";

export default eventHandler(async (event) => {
  const { business_id, time_slot_id } = await useValidatedBody(
    event,
    CreateAppointmentSchema
  );

  const client = await useSupabaseClient();
  const user = await useSupabaseUser();

  const { data, error } = await client
    .from("appointments")
    .insert({ business_id, time_slot_id, issuer_id: user.id })
    .select();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create appointment" })
    );
  }
  return data;
});

const CreateAppointmentSchema = v.objectAsync({
  business_id: v.string([v.uuid()]),
  time_slot_id: v.string([v.uuid()]),
});
