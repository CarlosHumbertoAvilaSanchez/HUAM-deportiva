import { createClient } from "@/utils/supabase/client";
import { Category } from "@/utils/definitions";

export default async function addEvent(data: {
  name: string;
  date: string;
  participants: number;
  location: string;
  categories: Category[];
  description: string;
}) {
  const supabase = createClient();
  const { categories, ...cleanedData } = data;

  const { data: eventResult, error: eventError } = await supabase
    .from("events")
    .insert([cleanedData]);

  if (eventError) {
    console.error("Error inserting data", eventError);
    throw new Error(eventError.message);
  }

  return eventResult;
}
