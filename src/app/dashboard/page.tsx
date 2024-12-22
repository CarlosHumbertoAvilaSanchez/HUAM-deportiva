import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cabin } from "@/app/fonts";
import Image from "next/image";
import {
  CalendarDays,
  Edit,
  MapPin,
  Trophy,
  User,
  PlusCircle,
} from "lucide-react";

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  participants: number;
  status: "upcoming" | "ongoing" | "completed";
  banner: string;
};

const events: Event[] = [
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

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${cabin.className}`}>
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#043364]">My Events</h1>
          <div className="flex items-center space-x-4">
            {/* TOGGLE */}
            <button className="flex p-2 justify-betwen items-center bg-[#043364] text-white rounded-md shadow-md">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </button>
          </div>
        </div>
        {/* viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4' */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} viewMode={"grid"} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-[#043364] text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={"/img/placeholder.webp"}
            alt="HUAM logo"
            width={90}
            height={30}
          />
        </div>
        <div className="flex item-center">
          <Image
            src={"/img/placeholder.webp"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          {/* Aqui va el menu hamburguesa */}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  event,
  viewMode,
}: {
  event: Event;
  viewMode: "list" | "grid";
}) {
  return (
    <div
      className={`w-full border-[1px] ${
        viewMode === "grid" ? "flex flex-col" : ""
      }`}
    >
      <div className={viewMode === "grid" ? "" : "flex"}>
        <div
          className={`relative ${
            viewMode === "grid" ? "h-48 w-full" : "w-1/3 min-w-[120px]"
          }`}
        >
          <Image
            // src={event.banner}
            src={"/img/placeholder.webp"}
            alt={`${event.name} banner`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className={`flex-grow p-4 ${
            viewMode === "grid" ? "flex flex-col justify-between" : ""
          }`}
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-[#043364]">
                {event.name}
              </h2>
              <StatusBadge status={event.status} />
            </div>
            <div className="flex items-center mb-2 text-sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center mb-2 text-sm">
              <User className="mr-2 h-4 w-4" />
              <span>{event.participants} participants</span>
            </div>
            <div className="flex items-center mb-4 text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <button className="flex p-2 gap-1 items-center shadow-sm border-2 rounded-md hover:bg-slate-50">
              <Edit className="mr-2 h-3 w-3" />
              Edit
            </button>
            <button className="flex p-2 gap-1 items-center shadow-sm border-2 rounded-md hover:bg-slate-50">
              <User className="mr-2 h-3 w-3" />
              Inscriptions
            </button>
            <button className="flex p-2 gap-1 items-center shadow-sm border-2 rounded-md hover:bg-slate-50">
              <Trophy className="mr-2 h-3 w-3" />
              {event.status === "completed" ? "Results" : "Add Results"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Event["status"] }) {
  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
