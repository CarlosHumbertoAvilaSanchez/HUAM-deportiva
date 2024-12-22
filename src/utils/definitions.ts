export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  participants: number;
  status: "upcoming" | "ongoing" | "completed";
  banner: string;
}
