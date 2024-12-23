import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cabin } from "@/app/fonts";
import Image from "next/image";
import Events from "@/components/dashboard-event/DashboardEvents";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${cabin.className}`}>
      <TopBar />
      <Events />
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
