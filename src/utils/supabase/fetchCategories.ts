import { createClient } from "@/utils/supabase/client";

export async function getAvailableCategories(
  eventId: string,
  age: number,
  genderId: number
) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_available_categories", {
    input_event_id: eventId,
    age,
    input_gender_id: genderId,
  });

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data;
}
