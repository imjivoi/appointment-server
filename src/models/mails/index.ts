import mailer from "../../mailer";
import { vueEmail } from "./templates";

//**TODO: pass props, add sendConfirmation, sendCancelation */

type SendReminderOptions = {
  to: string[];
};
export async function sendAppointmentReminder(options: SendReminderOptions) {
  const { to } = options;
  const template = await vueEmail.render("appointment-reminder.vue", { props: {} });
  await mailer.sendMail({
    from: process.env.MAIL_REMIDNER_FROM, // sender address
    to: to.join(", "), // list of receivers
    html: template,
  });
}
