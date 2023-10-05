import * as v from "valibot";

import { getAvailableTimeSlots } from "../../../models/time-slots";

//** Сделать проверку запсией на текущий день и сгенерировать доступные слоты*/

export default defineEventHandler(async (event) => {
  const { service_id, day } = await useValidatedQuery(
    event,
    GetAvailableTimeSlotsSchema
  );

  return getAvailableTimeSlots(day, service_id);
});

const GetAvailableTimeSlotsSchema = v.objectAsync({
  service_id: v.string([v.uuid()]),
  day: v.coerce(v.date([v.minValue(new Date())]), (v: string) => new Date(v)),
});
