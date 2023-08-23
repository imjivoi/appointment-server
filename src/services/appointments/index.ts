import { client } from "../../db/client";

export function getAppointments() {
  return client.from("appointments").select("*");
}
