import { getAppointments } from "../../../services/appointments";

export default defineEventHandler((event) => {
  return getAppointments();
});
