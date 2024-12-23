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

  const categoriesData = categories.map((categorie) => ({
    name: categorie,
  }));

  const { data: eventResult, error: eventError } = await supabase
    .from("events")
    .insert([cleanedData]);

  if (eventError) {
    console.error("Error inserting data", eventError);
    throw new Error(eventError.message);
  }

  const { error: categorieError } = await supabase
    .from("categories")
    .insert(categoriesData);
  return eventResult;
}
