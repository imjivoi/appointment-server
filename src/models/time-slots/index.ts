import { add, addMinutes, format, getISODay, startOfDay } from "date-fns/esm";
import { createError } from "h3";

import { useSupabaseClient } from "../../utils/use-supabase-client";
import { logger } from "../../utils/logger";
import { getServiceById } from "../services";

//**TODO: сделать доступным создание apointment строго в интервалах */

export async function getAvailableTimeSlots(day: Date, service_id: string) {
  const dayOfWeek = getISODay(day);
  const time = format(day, "HH:mm:ss");

  const client = await useSupabaseClient();

  // Check if weekday and time are available

  const { data: availableTimeSlots, error: availableTimeSlotsError } =
    await client
      .from("time_slots")
      .select("start_at, end_at")
      .eq("active", true)
      .eq("service_id", service_id)
      .eq("day_of_week", dayOfWeek)
      .lt("start_at", time)
      .gt("end_at", time);

  if (availableTimeSlotsError) {
    logger.error("availableTimeSlotsError: ", availableTimeSlotsError.message);
  }

  if (!availableTimeSlots.length) {
    return [];
  }
  const {
    data: { duration },
  } = await client
    .from("services")
    .select("duration")
    .eq("id", service_id)
    .single();

  const timeSlotsList = availableTimeSlots
    .map((slot) =>
      generateTimeSlots(
        new Date(timeToDate(slot.start_at, day)).getTime(),
        new Date(timeToDate(slot.end_at, day)).getTime(),
        duration
      )
    )
    .flat();
  const { data: ocuppiedSlots, error: ocuppiedSlotsError } = await client
    .from("appointments")
    .select("start_at, end_at")
    .eq("service_id", service_id)
    .in(
      "start_at",
      timeSlotsList.map((slot) => slot.start_at)
    )
    .order("start_at", { ascending: true });

  if (ocuppiedSlotsError) {
    logger.error("ocuppiedSlotsError: ", ocuppiedSlotsError.message);
  }

  if (!ocuppiedSlots.length) {
    return timeSlotsList;
  }

  const fitleredSlots = timeSlotsList.filter((slot) =>
    ocuppiedSlots.every((os) => {
      return (
        new Date(os.start_at).getTime() !== new Date(slot.start_at).getTime()
      );
    })
  );

  return fitleredSlots;
}

function generateTimeSlots(start_at: number, end_at: number, interval: number) {
  const timeSlots = [];
  let currentSlot = start_at;

  while (currentSlot < end_at) {
    const nextSlot = addMinutes(currentSlot, interval);
    timeSlots.push({
      start_at: new Date(currentSlot).toISOString(),
      end_at: new Date(nextSlot).toISOString(),
    });
    currentSlot = nextSlot.getTime();
  }

  return timeSlots;
}

function timeToDate(time: string, date: Date) {
  const [hour, minute, second] = time.split(":");
  return add(startOfDay(date), {
    hours: Number(hour),
    minutes: Number(minute),
    seconds: Number(second),
  });
}
