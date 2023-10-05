import { addMinutes, getISODay } from "date-fns/esm";
import { createError } from "h3";

import { useSupabaseClient } from "../../utils/use-supabase-client";

import { logger } from "../../utils/logger";
import { getAvailableTimeSlots } from "../time-slots";
import { getServiceById } from "../services";

export async function createAppointment(
  service_id: string,
  issuer_id: string,
  created_by_id: string,
  start_at: string | Date | number
) {
  const availableTimeSlots = await getAvailableTimeSlots(
    new Date(start_at),
    service_id
  );


  if (!availableTimeSlots.length) {
    throw createError("No available time slots");
  }

  const isInInterval = availableTimeSlots.find(
    (slot) => new Date(slot.start_at).getTime() === new Date(start_at).getTime()
  );

  if (!isInInterval) {
    throw createError("No available time slots");
  }

  const client = await useSupabaseClient();

  const service = await getServiceById(service_id);

  const endAt = addMinutes(new Date(start_at), service.duration);

  const { data, error } = await client
    .from("appointments")
    .insert({
      service_id,
      issuer_id,
      created_by_id,
      start_at: new Date(start_at).toISOString(),
      end_at: endAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    logger.error("availableTimeSlotsError: ", error.message);
    throw createError(error.message);
  }

  return data;
}
