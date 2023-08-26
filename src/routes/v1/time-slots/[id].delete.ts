import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, DeleteTimeSlot);

  const client = await useSupabaseClient();

  const { error } = await client.from("time_slots").delete().eq("id", id);

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not delete time slot" })
    );
  }

  setResponseStatus(event, 204, "No Content");
  return;
});

const DeleteTimeSlot = v.objectAsync({
  id: v.string([v.uuid()]),
});
