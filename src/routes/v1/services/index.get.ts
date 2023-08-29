import * as v from "valibot";

export default defineAuthEventHandler(async (event) => {
  const { business_id, id, slug } = await useValidatedQuery(
    event,
    GetServicesSchema
  );

  const client = await useSupabaseClient();

  const query = client.from("services").select();

  if (business_id) {
    query.eq("business_id", business_id);
  }

  if (id) {
    query.eq("id", id);
  }

  if (slug) {
    query.eq("slug", slug);
  }
  const { data, error } = await query;

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not get services" })
    );
  }

  return data;
});

const GetServicesSchema = v.objectAsync({
  business_id: v.optional(v.string([v.uuid()])),
  id: v.optional(v.string([v.uuid()])),
  slug: v.optional(v.string([v.minLength(3), v.maxLength(50)])),
});
