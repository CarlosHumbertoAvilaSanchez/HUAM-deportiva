import { Input } from "@/components/Input";
import { RegisterErrors as Errors } from "@/utils/definitions";

type AccountFields = {
  email: string;
  phoneNumber: string;
  createAccount: boolean;
  termsAccepted: boolean;
};

type AccountFormProps = AccountFields & {
  updateFields: (fields: Partial<AccountFields>) => void;
  fieldErrors?: Partial<Errors>;
};
export default function AccountForm({
  email,
  phoneNumber,
  createAccount,
  termsAccepted,
  updateFields,
  fieldErrors,
}: AccountFormProps) {
  return (
    <>
      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <Input
          errorMessage={fieldErrors?.email && fieldErrors.email[0]}
          type="email"
          className="w-full"
          name="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Número de teléfono</label>
        <Input
          errorMessage={fieldErrors?.phoneNumber && fieldErrors.phoneNumber[0]}
          type="tel"
          className="w-full"
          name="phoneNumber"
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
              createAccount: e.target.checked,
            })
          }
        />
        <label htmlFor="createAccount">Crear cuenta con esta información</label>
      </div>
      <div className="flex gap-2">
        <Input
          errorMessage={
            fieldErrors?.termsAccepted && fieldErrors.termsAccepted[0]
          }
          type="checkbox"
          name="termsAccepted"
          checked={termsAccepted}
          onChange={(e) => updateFields({ termsAccepted: e.target.checked })}
        />
        <label htmlFor="termsAccepted">Acepto términos y condiciones</label>
      </div>
    </>
  );
}
