import * as v from "valibot";

export default defineEventHandler(async (event) => {
  const { business_id, service_id, slots } = await useValidatedBody(
    event,
    CreateTimeSlotSchema
  );

  const client = await useSupabaseClient();

  const insertData = slots.map((slot: Slot) => ({
    ...slot,
    business_id,
    service_id,
  }));
  const { data, error } = await client
    .from("time_slots")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create time slot" })
    );
  }

  return data;
});

const SlotSchema = v.nonOptional(
  v.object({
    start_at: v.string([v.isoTimestamp()]),
    end_at: v.string([v.isoTimestamp()]),
  })
);

type Slot = Required<v.Input<typeof SlotSchema>>;

const CreateTimeSlotSchema = v.objectAsync({
  slots: v.array(SlotSchema),
  service_id: v.string([v.uuid()]),
  business_id: v.string([v.uuid()]),
});
