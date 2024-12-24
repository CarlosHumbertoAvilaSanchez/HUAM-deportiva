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
  const [genderId, setGender] = useState(0);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);

  function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    const newCategory: Category = {
      name,
      genderId,
      minAge,
      maxAge,
    };
    setCategories([...categories, newCategory]);
    console.log(categories);
    setName("");
    setGender(0);
    setMinAge(null);
    setMaxAge(null);
  }
  return (
    <form
      className="text-black flex flex-col gap-y-4"
      onSubmit={(e) => handleAddCategory(e)}
    >
      <div className="flex gap-y-1 flex-col">
        <label>Nombre</label>
        <Input
          type="text"
          value={name}
          placeholder="Enter the category"
          className="w-full"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-y-1 flex-col">
        <label>Rama</label>
        <Select
          options={[
            { value: 0, label: "Elije la rama" },
            { value: 1, label: "Varonil" },
            { value: 2, label: "Femenil" },
            { value: 3, label: "General" },
          ]}
          className="w-full"
          onChange={(e) => setGender(parseInt(e.target.value))}
          value={genderId}
          required
        />
      </div>
      <div className="flex gap-y-1 flex-col">
        <label>Rango de edad (opcional)</label>
        <div className="flex gap-4">
          <Input
            value={minAge ? minAge : ""}
            type="number"
            placeholder="Min age"
            onChange={(e) => setMinAge(parseInt(e.target.value))}
          />
          <Input
            value={maxAge ? maxAge : ""}
            type="number"
            placeholder="Max age"
            onChange={(e) => setMaxAge(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#043364] text-white rounded-md py-1"
      >
        Agregar
      </button>
    </form>
  );
}
