import * as v from "valibot";

export default defineBusinessRoleEventHandler(async (event, user) => {
  const { business_id, service_id, available } = await useValidatedQuery(
    event,
    GetTimeSlotsSchema
  );

  const client = await useSupabaseClient();

  const query = client
    .from("time_slots")
    .select(
      "*, appointment:appointments(*), business:business_id!inner(*, business_user!inner(*)))"
    )
    .eq("business_id.business_user.user_id", user.id);

  if (available) {
    query.is("appointment", null);
  }

  if (service_id) {
    query.eq("service_id", service_id);
  }

  if (business_id) {
    query.eq("business_id", business_id);
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
    return sendError(
      event,
      createError({ statusMessage: "Can not get time slots" })
    );
  }

  return data;
});

const GetTimeSlotsSchema = v.objectAsync({
  business_id: v.optional(v.string([v.uuid()])),
  service_id: v.string([v.uuid()]),
  available: v.coerce(v.optional(v.boolean()), Boolean),
});
