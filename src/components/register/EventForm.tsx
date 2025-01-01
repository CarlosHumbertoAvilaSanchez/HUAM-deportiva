import { Select, Input } from "@components/Input";
import { TSHIRT_SHIZES } from "@/utils/constants";
import { Category } from "@/utils/definitions";
import { useFetchCategories } from "@/hooks/useFetchCategories";

type EventFields = {
  birthDay: string;
  genderId: string;
  categoryId: string;
  tshirtSizeId: string;
  team?: string;
};

type EventFormProps = EventFields & {
  updateFields: (fields: Partial<EventFields>) => void;
  availableCategories: Category[];
};

export default function EventForm({
  birthDay,
  genderId,
  categoryId,
  tshirtSizeId,
  team,
  updateFields,
  availableCategories,
}: EventFormProps) {
  return (
    <>
      <div>
        <label htmlFor="category">Categoria</label>
        <Select
          options={
            availableCategories.length !== 0
              ? [
                  {
                    value: "",
                    label: "Elija una categoría",
                  },
                  ...availableCategories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ]
              : [
                  {
                    value: "",
                    label: "Registre su edad y género para mostrar categorías",
                  },
                ]
          }
          className="w-full"
          name="categoryId"
          required
          disabled={!birthDay || !genderId}
          value={categoryId}
          onChange={(e) => updateFields({ categoryId: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="tshirtSizeId">Talla de playera</label>
        <Select
          options={TSHIRT_SHIZES}
          className="w-full"
          name="tshirtSizeId"
          required
          value={tshirtSizeId}
          onChange={(e) => updateFields({ tshirtSizeId: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="team">Equipo (opcional)</label>
        <Input
          type="text"
          className="w-full"
          name="team"
          placeholder="Ingrese su equipo"
          value={team}
          onChange={(e) => updateFields({ team: e.target.value })}
        />
      </div>
    </>
  );
}
