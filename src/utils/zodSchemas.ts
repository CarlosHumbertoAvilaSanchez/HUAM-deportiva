import { z } from "zod";

export const UserRegisterSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio." })
    .min(1, "El nombre no puede estar vacío."),
  lastName: z
    .string({ message: "El apellido es obligatorio." })
    .min(1, "El apellido no puede estar vacío."),
  birthDay: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
  genderId: z.enum(["1", "2"], {
    message: "Debe seleccionar un género válido.",
  }),
});

export const EventRegisterSchema = z.object({
  categoryId: z
    .number({ message: "La categoría es obligatoria." })
    .gt(0, "Debe seleccionar una categoría válida."),
  tshirtSizeId: z
    .number({ message: "La talla de camiseta es obligatoria." })
    .gt(0, "Debe seleccionar una talla válida."),
  team: z
    .string()
    .max(10, "El nombre del equipo no puede exceder los 50 caracteres.")
    .optional(),
});

export const AccountRegisterSchema = z.object({
  email: z
    .string({ message: "El correo electrónico es obligatorio." })
    .email("Introduce un correo electrónico válido."),
  phoneNumber: z
    .string({ message: "El número de teléfono es obligatorio." })
    .regex(/^\d{10,15}$/, "El número debe contener entre 10 y 15 dígitos."),
  termsAccepted: z
    .boolean()
    .refine((val) => val, "Debe aceptar los términos y condiciones."),
  createAccount: z.boolean(),
});

export const EventRegistrationSchema = z.object({
  ...UserRegisterSchema.shape,
  ...EventRegisterSchema.shape,
  ...AccountRegisterSchema.shape,
  eventId: z.string().uuid().optional(),
});
