import { z } from "zod";

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  participants: number;
  status: "upcoming" | "ongoing" | "completed";
  banner: string;
}

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  genderId: z.number().gt(0),
  minAge: z.number().gt(5, "La edad mínima es de 5 años"),
  maxAge: z.number(),
  eventId: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export interface Participant {
  id?: string;
  categoryId: number;
  team?: string;
  eventId: string;
  profileId: string;
  tshirtSizeId: number;
}

export interface TshirtSize {
  id?: number;
  size: string;
}

export interface Profiles {
  id?: string;
  name: string;
  lastName: string;
  birthDay: Date;
  genderId: number;
  userId?: string;
  email?: string;
}

export enum GenderId {
  male = "1",
  female = "2",
}

export interface RegisterErrors {
  name: Array<string>;
  lastName: Array<string>;
  email: Array<string>;
  phoneNumber: Array<string>;
  birthDay: Array<string>;
  genderId: Array<string>;
  categoryId: Array<string>;
  tshirtSizeId: Array<string>;
  team?: Array<string>;
  termsAccepted: Array<string>;
  createAccount: Array<string>;
}
