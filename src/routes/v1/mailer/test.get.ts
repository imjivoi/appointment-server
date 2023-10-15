import mailer from "../../../mailer";
import { sendAppointmentReminder } from "#models/mails";

export default defineEventHandler(async (event) => {
  try {
    await sendAppointmentReminder({ to: ["test@test.com"] });
    return "ok";
  } catch (error) {
    return error;
  }
});
