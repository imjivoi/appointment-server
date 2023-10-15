import * as v from "valibot";

import { createAppointment } from "#models/appointments";

export default eventHandler(async (event) => {
  const { service_id, start_at, email, phone } = await useValidatedBody(
    event,
    CreateAppointmentSchema
  );

  const client = await useSupabaseClient();

  let user = await useSupabaseUser().catch(() => null);
  let createUserError;
  let getUserError;
  if (!user) {
    const { data, error: getUserError } = await client
      .from("profiles")
      .select()
      .eq("email", email)
      .single();
    user = data;

    if (!user) {
      const adminClient = useSupabaseServiceRole();
      const { error: createUserError, data } =
        await adminClient.auth.admin.createUser({
          email,
          phone,
          user_metadata: {
            role: "customer",
          },
        });
      user = data.user;
    }
  }

  if (createUserError) {
    logger.error(createUserError);
    return sendError(
      event,
      createError({ statusMessage: "Can not create appointment" })
    );
  }

  const appointment = await createAppointment(
    service_id,
    user.id,
    user.id,
    start_at
  );

  try {
    // const { data: appointmentToken, error: appointmentTokenError } =
    //   await client
    //     .from("appointment_tokens")
    //     .insert({
    //       token: generateConfirmToken(),
    //       appointment_id: appointment.id,
    //     })
    //     .select()
    //     .single();
    // const confirmLink = `${config.clientUrl}/confirm-appointment/${appointmentToken.token}`;
    // const cancelLink = `${config.clientUrl}/cancel-appointment/${appointmentToken.token}`;
    // await mailer.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: user.email, // list of receivers
    //   subject: "Appointment confirmation", // Subject line
    //   text: "Link for confirm appointment", // plain text body
    //   html: `<div><a  href="${confirmLink}">Confirm</a><a href="${cancelLink}">Cancel</a></div>`,
    // });
  } catch (error) {}

  return appointment;
});

const CreateAppointmentSchema = v.objectAsync({
  service_id: v.string([v.uuid()]),
  start_at: v.coerce(
    v.date([v.minValue(new Date())]),
    (v: string) => new Date(v)
  ),
  email: v.stringAsync([v.email(), v.customAsync(isValidMx, "Invalid email")]),
  phone: v.optional(v.string([phoneValidation])),
});

const argentinaMobileNumberRegex =
  /^(?:\+?54|0)(?:(?:9\d|11|2\d|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9])\d{6}|9[0-9]{8})$/;
function phoneValidation(input: string) {
  if (argentinaMobileNumberRegex.test(input)) {
    return { output: input };
  }
  return {
    issue: {
      validation: "custom",
      message: "Invalid phone number",
      input,
    },
  };
}
