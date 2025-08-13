import React from "react";
import { CalendarSelect } from "./calendar-select";

export function SelectDate() {
  return (
    <div className="flex  w-full h-full">
      <section className="space-y-2 w-full h-full flex flex-col">
        <p className="text-gray-500 font-semibold max-md:hidden">
          Seleccionar una fecha
        </p>
        <div className="flex-grow">
          <CalendarSelect />
        </div>
      </section>
    </div>
  );
}
