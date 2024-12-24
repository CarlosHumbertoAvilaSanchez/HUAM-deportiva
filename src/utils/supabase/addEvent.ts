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
    .insert([cleanedData])
    .select("id")
    .single();

  if (eventError) {
    console.error("Error inserting data", eventError);
    throw new Error(eventError.message);
  }

  const eventId = eventResult?.id;
  if (!eventId) {
    throw new Error("Event ID not found after insertion.");
  }

  const categoriesFormatted = categories.map((category) => ({
    name: category.name,
    gender_id: category.genderId || null,
    min_age: category.minAge,
    max_age: category.maxAge,
  }));

  const { data: insertedCategories, error: categoryError } = await supabase
    .from("categories")
    .insert(categoriesFormatted)
    .select("id");

  if (categoryError) {
    console.error("Error inserting data", eventError);
    throw new Error(categoryError.message);
  }

  if (!insertedCategories || insertedCategories.length === 0) {
    throw new Error("No categories were inserted.");
  }

  const eventCategories = insertedCategories.map((category) => ({
    event_id: eventId,
    category_id: category.id,
  }));

  const { error: eventCategoriesError } = await supabase
    .from("event_categories")
    .insert(eventCategories);

  if (eventCategoriesError) {
    console.error(
      "Error inserting event_categories data",
      eventCategoriesError
    );
    throw new Error(eventCategoriesError.message);
  }
  return eventResult;
}
