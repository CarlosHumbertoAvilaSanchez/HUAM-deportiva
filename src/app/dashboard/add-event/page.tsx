import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cabin } from "@/app/fonts";
import { AddEventForm } from "@/app/components/AddEventForm";

export default async function AddEvent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${cabin.className}`}>
      <div className="container mx-auto px-4 py-8 max-w-[900px]">
        <h1 className="text-3xl text-[#043364] mb-6">Add New Event</h1>
        <AddEventForm />
      </div>
    </div>
  );
}
