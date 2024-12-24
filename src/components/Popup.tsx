"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { X } from "lucide-react";

interface PopupProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Popup({ title, onClose, children }: PopupProps) {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");
  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose && onClose();
  };

  const dialog: React.ReactElement | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="p-4 min-w-[400px] min-[600px] rounded-lg text-[#043364] flex flex-col gap-y-4 backdrop:bg-gray-950/70"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">{title}</h2>
          <button
            className="border-[1px] border-slate-300 rounded-md w-[24px] h-[24px] flex items-center justify-center bg-slate-50"
            onClick={closeDialog}
          >
            <X width={16} height={16} />
          </button>
        </div>
        <div>{children}</div>
      </dialog>
    ) : null;

  return dialog;
}
