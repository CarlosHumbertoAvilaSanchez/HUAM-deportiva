import { Select, Input } from "@components/Input";
import { TSHIRT_SHIZES } from "@/utils/constants";
import { Category } from "@/utils/definitions";
import { GenderId } from "@/utils/definitions";
import { RegisterErrors as Errors } from "@/utils/definitions";
type EventFields = {
  birthDay: string;
  genderId: GenderId | "";
  categoryId: number | "";
  tshirtSizeId: number | "";
  team?: string;
};

type EventFormProps = EventFields & {
  updateFields: (fields: Partial<EventFields>) => void;
  availableCategories: Category[];
  fieldErrors?: Partial<Errors>;
};

export default function EventForm({
  birthDay,
  genderId,
  categoryId,
  tshirtSizeId,
  team,
  updateFields,
  availableCategories,
  fieldErrors,
}: EventFormProps) {
  return (
    <>
      <div>
        <label htmlFor="category">Categoria</label>
        <Select
          errorMessage={fieldErrors?.categoryId && fieldErrors.categoryId[0]}
          options={
            availableCategories.length !== 0
              ? [
                  {
                    value: "",
                    label: "Elija una categoría",
                  },
                  ...availableCategories.map((category) => ({
                    value: category.id,
                    label: `${category.name} $${category.price}`,
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
          disabled={!birthDay || !genderId}
          value={categoryId}
          onChange={(e) =>
            updateFields({
              categoryId: e.target.value ? parseInt(e.target.value) : "",
            })
          }
        />
      </div>
      <div>
        <label htmlFor="tshirtSizeId">Talla de playera</label>
        <Select
          errorMessage={
            fieldErrors?.tshirtSizeId && fieldErrors.tshirtSizeId[0]
          }
          options={TSHIRT_SHIZES}
          className="w-full"
          name="tshirtSizeId"
          value={tshirtSizeId}
          onChange={(e) =>
            updateFields({
              tshirtSizeId: e.target.value ? parseInt(e.target.value) : "",
            })
          }
        />
      </div>
      <div>
        <label htmlFor="team">Equipo (opcional)</label>
        <Input
          errorMessage={fieldErrors?.team && fieldErrors.team[0]}
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
