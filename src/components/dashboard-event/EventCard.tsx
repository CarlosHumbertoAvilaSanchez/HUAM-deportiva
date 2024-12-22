import Image from "next/image";
import { CalendarDays, Edit, MapPin, Trophy, User } from "lucide-react";
import type { Event } from "@/utils/definitions";
import StatusBadge from "@/components/dashboard-event/StatusBadge";

export function EventCard({
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
              {/* <StatusBadge status={event.status} /> */}
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
          <div className="flex gap-2">
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
