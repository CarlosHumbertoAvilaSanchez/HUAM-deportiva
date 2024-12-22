import type { Event } from "@/utils/definitions";

export const events: Event[] = [
  {
    id: "1",
    name: "City Marathon",
    date: "2023-09-15",
    location: "Central Park",
    participants: 500,
    status: "upcoming",
    banner: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "2",
    name: "Triathlon Challenge",
    date: "2023-08-20",
    location: "Seaside Beach",
    participants: 200,
    status: "ongoing",
    banner: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "3",
    name: "Charity 5K Run",
    date: "2023-07-10",
    location: "Downtown",
    participants: 1000,
    status: "completed",
    banner: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "4",
    name: "Mountain Bike Race",
    date: "2023-10-05",
    location: "Hill Valley",
    participants: 150,
    status: "upcoming",
    banner: "/placeholder.svg?height=100&width=200",
  },
];
