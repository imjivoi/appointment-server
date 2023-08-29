import { User } from "@supabase/supabase-js";
import { H3Event } from "h3";

export function defineBusinessRoleEventHandler<T>(
  handler: (event: H3Event<T>, user: User) => T | Promise<T>
) {
  // @ts-ignore
  return defineAuthEventHandler<T>(async (event, user) => {
    const client = await useSupabaseClient();

    const { data, error } = await client
      .from("role_user")
      .select("*, role_id!inner(name)")
      .eq("user_id", user.id)
      .eq("role_id.name", "business")
      .single();

    if (error || !data) {
      return sendError(
        event,
        createError({ statusMessage: "Forbidden", statusCode: 403 })
      );
    }

    return handler(event, user);
  });
}
