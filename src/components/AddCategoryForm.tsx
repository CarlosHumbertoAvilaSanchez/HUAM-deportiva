import { Input, Select } from "@/components/Input";
import { useState } from "react";
import type { Category } from "@/utils/definitions";

interface AddCategoryFormProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function AddCategoryForm({
  categories,
  setCategories,
}: AddCategoryFormProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault;
    const newCategory: Category = {
      name,
      gender,
      minAge,
      maxAge,
    };
    setCategories([...categories, newCategory]);
  }
  return (
    <form className="text-black flex flex-col gap-y-4">
      <div className="flex gap-y-1 flex-col">
        <label>Nombre</label>
        <Input
          type="text"
          placeholder="Enter the category"
          className="w-full"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-y-1 flex-col">
        <label>Rama</label>
        <Select
          options={[
            { value: 0, label: "Varonil" },
            { value: 1, label: "Femenil" },
          ]}
          className="w-full"
          onChange={(e) => setGender(parseInt(e.target.value))}
        />
      </div>
      <div className="flex gap-y-1 flex-col">
        <label>Rango de edad (opcional)</label>
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Min age"
            onChange={(e) => setMinAge(parseInt(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Max age"
            onChange={(e) => setMaxAge(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button
        onClick={(e) => handleAddCategory}
        className="w-full bg-blue-800 text-white rounded-md py-1"
      >
        Agregar
      </button>
    </form>
  );
}
