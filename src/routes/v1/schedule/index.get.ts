import { getSchedules } from "../../../services/schedule";

export default eventHandler((event) => {
  return getSchedules();
});
