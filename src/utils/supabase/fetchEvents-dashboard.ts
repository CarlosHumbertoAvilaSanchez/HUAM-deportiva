import { createClient } from "@/utils/supabase/client";

export default async function fetchEvents() {
  const supabase = createClient();

  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data;
}
