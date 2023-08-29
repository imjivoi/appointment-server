import * as v from "valibot";

export default defineBusinessRoleEventHandler(async (event, user) => {
  const { id } = await useValidatedParams(event, DeleteServiceSchema);
  const client = await useSupabaseClient();

  //**Check  if owner of business_id business*/
  const { data: businessOwnerData, error: businessOwnerError } = await client
    .from("services")
    .select("business_id!inner(business_user!inner(*))")
    .eq("business_id.business_user.user_id", user.id);

  if (businessOwnerError || !businessOwnerData?.length) {
    return sendError(
      event,
      createError({
        statusMessage: "Forbidden. You are not business owner",
        statusCode: 403,
      })
    );
  }

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
