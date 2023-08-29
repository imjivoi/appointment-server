import * as v from "valibot";

export default defineAuthEventHandler(async (event, user) => {
  const { id } = await useValidatedParams(event, DeleteTimeSlot);

  const client = await useSupabaseClient();

  //**Check  if owner of business_id business*/
  const { data: businessOwnerData, error: businessOwnerError } = await client
    .from("time_slots")
    .select("business_id!inner(business_user!inner(*))")
    .eq("business_id.business_user.user_id", user.id)

  if (businessOwnerError || !businessOwnerData?.length) {
    return sendError(
      event,
      createError({
        statusMessage: "Forbidden. You are not business owner",
        statusCode: 403,
      })
    );
  }

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
