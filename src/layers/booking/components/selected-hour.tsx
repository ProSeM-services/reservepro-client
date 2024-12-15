"use client";
import { useSearchParams } from "next/navigation";

export function SelectedHour() {
  const params = useSearchParams();

  const hour = params.get("time");

  if (!hour) return null;
  return (
    <div className="flex w-full p-2 text-gray-600 justify-between items-center">
      <p>Horario</p>
      <p>{hour} hs</p>
    </div>
  );
}
