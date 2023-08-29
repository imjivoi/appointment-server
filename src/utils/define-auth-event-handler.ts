import { User } from "@supabase/supabase-js";
import { EventHandler, H3Event } from "h3";

// export const defineAuthEventHandler = <T>(
//   handler: EventHandler<T>,
//   _user: User
// ) =>
//   defineEventHandler(async (event) => {
//     const user = await useSupabaseUser().catch((err) => null);

//     if (!user) {
//       return sendError(
//         event,
//         createError({ statusMessage: "Unauthorized", statusCode: 401 })
//       );
//     }

//     return handler(event, user);
//   });

export function defineAuthEventHandler<T>(
  handler: (event: H3Event<T>, user: User) => T | Promise<T>
) {
  return defineEventHandler<T>(async (event) => {
    const user = await useSupabaseUser().catch((err) => null);

    if (!user) {
      return sendError(
        event,
        createError({ statusMessage: "Unauthorized", statusCode: 401 })
      );
    }
    return handler(event, user);
  });
}
