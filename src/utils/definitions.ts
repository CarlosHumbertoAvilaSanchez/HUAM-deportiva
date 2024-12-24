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
  id?: string;
  name: string;
  genderId?: number;
  minAge: number | null;
  maxAge: number | null;
}
