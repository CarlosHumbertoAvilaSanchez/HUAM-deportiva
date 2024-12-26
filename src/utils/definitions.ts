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
  eventId?: string;
  name: string;
  birthDay: Date;
  genderId: number;
  categoryId: number;
  tshirtSize: string;
  teamName?: string;
  email: string;
  phoneNumber: string;
  participantNumber?: number;
}
