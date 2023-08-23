import { getMyBusinesses } from "../../../services/businesses";

export default defineEventHandler(() => {
  return getMyBusinesses();
});
