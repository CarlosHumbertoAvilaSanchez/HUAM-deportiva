import { createClient } from "@/utils/supabase/client";

export default async function addEvent(data: {
  name: string;
  date: string;
  participants: number;
  location: string;
  categories: string[];
  description: string;
}) {
  const supabase = createClient();
  const { categories, ...cleanedData } = data;
  console.log(data.date);
  const { data: result, error } = await supabase
    .from("events")
    .insert([cleanedData]);

  if (error) {
    console.error("Error inserting data", error);
    throw new Error(error.message);
  }

  return result;
}
