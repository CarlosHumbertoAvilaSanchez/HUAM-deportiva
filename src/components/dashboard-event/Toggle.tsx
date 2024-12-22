import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/utils/utils";
type ViewMode = "list" | "grid";

type ToggleProps = {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
};

export default function Toggle({ viewMode, setViewMode }: ToggleProps) {
  const handleViewMode = () => {
    setViewMode(viewMode == "list" ? "grid" : "list");
  };
  return (
    <div className="flex border-[1px] rounded-md shadow-sm border-slate-300 p-1">
      <button
        className={cn(
          viewMode == "list" ? "bg-slate-200" : "bg-[rgb(243, 244, 246)]",
          "h-full w-full p-1 rounded-sm flex justify-center"
        )}
        onClick={handleViewMode}
      >
        <LayoutList />
      </button>
      <button
        className={cn(
          viewMode == "grid" ? "bg-slate-200" : "bg-[rgb(243, 244, 246)]",
          "h-full w-full p-1 rounded-sm flex justify-center"
        )}
        onClick={handleViewMode}
      >
        <LayoutGrid />
      </button>
    </div>
  );
}
