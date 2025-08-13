"use client";

import { useSearchParams } from "next/navigation";

export function SelectedDate() {
  const params = useSearchParams();

  const date = params.get("date");

  if (!date) return null;
  return (
    <div className="flex w-full p-2 text-gray-600 justify-between items-center">
      <p>Dia</p>
      <p>{new Date(date).toLocaleDateString()} hs</p>
    </div>
  );
}
