import { Input, Select } from "@components/Input";

const GENDER_OPTIONS = [
  { value: "", label: "Elija su genero" },
  { value: 1, label: "Masculino" },
  { value: 2, label: "Femenino" },
];

type UserFields = {
  name: string;
  lastName: string;
  birthDay: string;
  genderId: string;
};

type UserFormProps = UserFields & {
  updateFields: (fields: Partial<UserFields>) => void;
};

export default function UserForm({
  name,
  lastName,
  birthDay,
  genderId,
  updateFields,
}: UserFormProps) {
  return (
    <>
      <div className="flex gap-10">
        <div className="w-full">
          <label htmlFor="name">Nombre</label>
          <div>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese su nombre"
              className="w-full"
              required
              value={name}
              onChange={(e) => updateFields({ name: e.target.value })}
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="lastName">Apellidos</label>
          <div>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ingrese su apellido"
              className="w-full"
              required
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
            type="date"
            name="birthDay"
            required
            value={birthDay}
            onChange={(e) => updateFields({ birthDay: e.target.value })}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="genderId">Genero</label>
          <Select
            options={GENDER_OPTIONS}
            required
            name="genderId"
            value={genderId}
            onChange={(e) => updateFields({ genderId: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}
