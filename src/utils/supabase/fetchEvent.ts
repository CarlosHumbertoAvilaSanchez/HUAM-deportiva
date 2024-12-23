import { createClient } from "@/utils/supabase/client";

export default async function getEventById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching events:", error);
    return null;
  }

  return data[0];
}
