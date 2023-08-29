import { User } from "@supabase/supabase-js";
import * as v from "valibot";
import { customAsync } from "valibot";

export default eventHandler(async (event) => {
  const { business_id, time_slot_id, email, phone } = await useValidatedBody(
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
    return sendError(
      event,
      createError({ statusMessage: "Can not create appointment" })
    );
  }

  const { data, error } = await client
    .from("appointments")
    .insert({ business_id, time_slot_id, issuer_id: user.id })
    .select();

  if (error) {
    return sendError(
      event,
      createError({ statusMessage: "Can not create appointment" })
    );
  }
  return data;
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
