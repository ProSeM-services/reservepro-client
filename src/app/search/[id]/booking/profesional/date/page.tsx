import React from "react";
import { CalendarSelect } from "./components/calendar-select";

export default function SelectDatePage() {
  return (
    <div className="flex">
      <section className="space-y-2">
        <p className="text-gray-400 font-semibold">Seleccionar una fecha</p>
        <CalendarSelect />
      </section>
    </div>
  );
}
