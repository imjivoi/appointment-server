import * as v from "valibot";

import mailer from "../../../mailer";

export default eventHandler(async (event) => {
  const { business_id, time_slot_id, email, phone } = await useValidatedBody(
    event,
    CreateAppointmentSchema
  );

  const config = useRuntimeConfig();

  const client = await useSupabaseClient();

  const { data: occupiedTimeSlot, error: occupiedTimeSlotError } = await client
    .from("appointments")
    .select()
    .eq("time_slot_id", time_slot_id)
    .eq("confirmed", true)
    .maybeSingle();

  if (occupiedTimeSlot || occupiedTimeSlotError) {
    logger.error(`Time slot with id ${time_slot_id} is not available`);
    return sendError(
      event,
      createError({
        statusMessage: "Time slot is not available",
        statusCode: 400,
      })
    );
  }
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
    logger.error(createUserError)
    return sendError(
      event,
      createError({ statusMessage: "Can not create appointment" })
    );
  }

  const { data: appointment, error } = await client
    .from("appointments")
    .insert({ business_id, time_slot_id, issuer_id: user.id })
    .select()
    .single();

  if (error) {
    logger.error(error);
    return sendError(
      event,
      createError({ statusMessage: "Can not create appointment" })
    );
  }

  const { data: appointmentToken, error: appointmentTokenError } = await client
    .from("appointment_tokens")
    .insert({ token: generateConfirmToken(), appointment_id: appointment.id })
    .select()
    .single();
  const confirmLink = `${config.clientUrl}/confirm-appointment/${appointmentToken.token}`;
  const cancelLink = `${config.clientUrl}/cancel-appointment/${appointmentToken.token}`;
  await mailer.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: user.email, // list of receivers
    subject: "Appointment confirmation", // Subject line
    text: "Link for confirm appointment", // plain text body
    html: `<div><a  href="${confirmLink}">Confirm</a><a href="${cancelLink}">Cancel</a></div>`,
  });

  return appointment;
});

const CreateAppointmentSchema = v.objectAsync({
  business_id: v.string([v.uuid()]),
  service_id: v.string([v.uuid()]),
  time_slot_id: v.string([v.uuid()]),
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
