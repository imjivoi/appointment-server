import * as v from "valibot";
import {
  getISODay,
  format,
  addMinutes,
  setMinutes,
  getMinutes,
  add,
  startOfDay,
} from "date-fns";

//** Сделать проверку запсией на текущий день и сгенерировать доступные слоты*/

export default defineEventHandler(async (event) => {
  const { service_id, day } = await useValidatedQuery(
    event,
    GetAvailableTimeSlotsSchema
  );

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

  const { data: ocuppiedSlots, error: ocuppiedSlotsError } = await client
    .from("appointments")
    .select("start_at, end_at")
    .eq("service_id", service_id)
    .lt("start_at", day.toISOString())
    .order("start_at", { ascending: true });

  if (ocuppiedSlotsError) {
    logger.error("ocuppiedSlotsError: ", ocuppiedSlotsError.message);
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
  if (!ocuppiedSlots.length) {
    return timeSlotsList;
  }
  return timeSlotsList.filter((slot) =>
    ocuppiedSlots.some(
      (s) =>
        new Date(s.start_at).getTime() !== new Date(slot.start_at).getTime()
    )
  );
});

const GetAvailableTimeSlotsSchema = v.objectAsync({
  service_id: v.string([v.uuid()]),
  day: v.coerce(v.date([v.minValue(new Date())]), (v: string) => new Date(v)),
});

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
