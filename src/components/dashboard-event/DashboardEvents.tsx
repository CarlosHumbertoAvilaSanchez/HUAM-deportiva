"use client";

import { EventCard } from "@/components/dashboard-event/EventCard";
import type { Event } from "@/utils/definitions";
import { PlusCircle } from "lucide-react";
import fetchEvents from "@/utils/supabase/fetchEvents-dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toggle from "@/components/dashboard-event/Toggle";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const router = useRouter();

  useEffect(() => {
    async function loadEvents() {
      const data = await fetchEvents();
      setEvents(data);
    }

    loadEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-[#043364]">My Events</h1>
        <div className="flex items-center space-x-4">
          <Toggle viewMode={viewMode} setViewMode={setViewMode} />
          <button
            onClick={() => router.push("/dashboard/add-event")}
            className="flex p-2 justify-betwen items-center bg-[#043364] text-white rounded-md shadow-md"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>
      {/*  */}
      {events?.length ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div>No hay eventos</div>
      )}
    </div>
  );
}
