import { createError } from "h3";

import { useSupabaseClient } from "../../utils/use-supabase-client";

export async function getServiceById(id: string) {
  const client = await useSupabaseClient();

  const { data, error } = await client
    .from("services")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw createError(error.message);
  }

  return data;
}
