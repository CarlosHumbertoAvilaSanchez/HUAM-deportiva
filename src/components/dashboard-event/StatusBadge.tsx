import type { Event } from "@/utils/definitions";

export default function StatusBadge({ status }: { status: Event["status"] }) {
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
