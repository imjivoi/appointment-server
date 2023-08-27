import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { id } = await useValidatedParams(event, DeleteServiceSchema);
  const client = await useSupabaseClient();

  const { error } = await client.from("services").delete().eq("id", id);

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not delete service" })
    );
  }

  setResponseStatus(event, 204, "No Content");
  return;
});

const DeleteServiceSchema = v.objectAsync({
  id: v.string([v.uuid()]),
});
