import { useEffect, useState } from "react";
import type { Category } from "@/utils/definitions";
import { getAvailableCategories } from "@/utils/supabase/fetchCategories";
import { calculateAge } from "@/utils/utils";

export function useFetchCategories({
  birthDay,
  genderId,
  eventId,
}: {
  birthDay: string;
  genderId: string;
  eventId: string;
}) {
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  useEffect(() => {
    async function loadCategories(
      eventId: string,
      age: number,
      genderId: number
    ) {
      const data = await getAvailableCategories(eventId, age, genderId);
      console.log("hice un fetch");
      setAvailableCategories(data);
    }

    if (birthDay && genderId) {
      const age = calculateAge(birthDay);
      loadCategories(eventId, age, parseInt(genderId));
    }
  }, [birthDay, genderId]);
  return { availableCategories };
}
