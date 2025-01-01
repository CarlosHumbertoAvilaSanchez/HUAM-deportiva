import { Input } from "@/components/Input";

type AccountFields = {
  email: string;
  phoneNumber: string;
  createAccount: boolean;
  termsAccepted: boolean;
};

type AccountFormProps = AccountFields & {
  updateFields: (fields: Partial<AccountFields>) => void;
};
export default function ContactForm({
  email,
  phoneNumber,
  createAccount,
  termsAccepted,
  updateFields,
}: AccountFormProps) {
  return (
    <>
      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <Input
          type="email"
          className="w-full"
          name="email"
          placeholder="Ingrese su correo electrónico"
          required
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Número de teléfono</label>
        <Input
          type="tel"
          className="w-full"
          name="phoneNumber"
          required
          maxLength={10}
          placeholder="Ingrese un número de teléfono"
          value={phoneNumber}
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <Input
          type="checkbox"
          name="createAccount"
          checked={createAccount}
          onChange={(e) =>
            updateFields({
              createAccount: e.target.value === "on" ? true : false,
            })
          }
        />
        <label htmlFor="createAccount">Crear cuenta con esta información</label>
      </div>
      <div className="flex gap-2">
        <Input
          type="checkbox"
          name="termsAccepted"
          checked={termsAccepted}
          onChange={(e) =>
            updateFields({
              termsAccepted: e.target.value === "on" ? true : false,
            })
          }
        />
        <label htmlFor="termsAccepted">Acepto términos y condiciones</label>
      </div>
    </>
  );
}
