import { Input, Select } from "@components/Input";
import { GenderId, RegisterErrors as Errors } from "@/utils/definitions";

const GENDER_OPTIONS = [
  { value: "", label: "Elija su genero" },
  { value: 1, label: "Masculino" },
  { value: 2, label: "Femenino" },
];

type UserFields = {
  name: string;
  lastName: string;
  birthDay: string;
  genderId: GenderId | "";
};

type UserFormProps = UserFields & {
  updateFields: (fields: Partial<UserFields>) => void;
  fieldErrors?: Partial<Errors>;
};

export default function UserForm({
  name,
  lastName,
  birthDay,
  genderId,
  updateFields,
  fieldErrors,
}: UserFormProps) {
  return (
    <>
      <div className="flex gap-10">
        <div className="w-full">
          <label htmlFor="name">Nombre</label>
          <div>
            <Input
              errorMessage={fieldErrors?.name && fieldErrors.name[0]}
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese su nombre"
              className="w-full"
              value={name}
              onChange={(e) => updateFields({ name: e.target.value })}
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="lastName">Apellidos</label>
          <div>
            <Input
              errorMessage={fieldErrors?.lastName && fieldErrors.lastName[0]}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ingrese su apellido"
              className="w-full"
              value={lastName}
              onChange={(e) => updateFields({ lastName: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="birthDay">Fecha de nacimiento</label>
          <Input
            errorMessage={fieldErrors?.birthDay && fieldErrors.birthDay[0]}
            type="date"
            name="birthDay"
            value={birthDay}
            onChange={(e) => updateFields({ birthDay: e.target.value })}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="genderId">Genero</label>
          <Select
            errorMessage={fieldErrors?.genderId && fieldErrors.genderId[0]}
            options={GENDER_OPTIONS}
            name="genderId"
            value={genderId}
            onChange={(e) =>
              updateFields({ genderId: e.target.value as GenderId })
            }
          />
        </div>
      </div>
    </>
  );
}
