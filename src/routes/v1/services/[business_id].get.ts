import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { business_id } = await useValidatedParams(event, GetServicesSchema);

  const client = await useSupabaseClient();

  const { data, error } = await client
    .from("services")
    .select()
    .eq("business_id", business_id);

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not get services" })
    );
  }

  return data;
});

const GetServicesSchema = v.objectAsync({
  business_id: v.string([v.uuid()]),
});
