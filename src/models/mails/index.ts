import mailer from "../../mailer";
import { vueEmail } from "./config";

const MAIL_FROM = process.env.MAIL_FROM;
//**TODO: pass props, add sendConfirmation, sendCancelation */

type SendReminderOptions = {
  to: string[];
};
export async function sendAppointmentReminder(options: SendReminderOptions) {
  const { to } = options;
  const template = await vueEmail.render("Test.vue");
  await mailer.sendMail({
    from: MAIL_FROM, // sender address
    to: to.join(", "), // list of receivers
    html: template,
  });
}

//** */
type SendConfirmationOptions = {
  to: string[];
};
export async function sendAppointmentConfirmation(
  options: SendConfirmationOptions
) {
  const { to } = options;
  const template = await vueEmail.render("appointment-confirmation.vue", {
    props: {},
  });
  await mailer.sendMail({
    from: MAIL_FROM, // sender address
    to: to.join(", "), // list of receivers
    html: template,
  });
}

//** */
type SendCancelationOptions = {
  to: string[];
};
export async function sendAppointmentCancelation(
  options: SendCancelationOptions
) {
  const { to } = options;
  const template = await vueEmail.render("appointment-cancelation.vue", {
    props: {},
  });
  await mailer.sendMail({
    from: MAIL_FROM, // sender address
    to: to.join(", "), // list of receivers
    html: template,
  });
}
