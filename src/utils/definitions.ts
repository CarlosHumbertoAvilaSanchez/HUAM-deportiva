export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  participants: number;
  status: "upcoming" | "ongoing" | "completed";
  banner: string;
}

export interface Category {
  id?: string | number;
  name: string;
  genderId?: number;
  minAge: number | null;
  maxAge: number | null;
  eventId?: number;
}

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
