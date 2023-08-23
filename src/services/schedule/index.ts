import { client } from "../../db/client";

export function getSchedules() {
  return client.from("schedule").select("*");
}
