import { IWorkhour } from "@/interfaces";
import React from "react";

export default function WorkhourList({
  worhHours,
}: {
  worhHours: IWorkhour[];
}) {
  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "mié rcoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];
  return (
    <div className={`flex w-full bg-accent  `}>
      {worhHours.map(({ day, segments }) => (
        <div key={day} className="flex flex-col items-center w-full  ">
          <p className="border w-full text-center p-2 ">{DAYS[day].short}</p>
          <div className="flex flex-col gap-2 py-4 font-light ">
            {segments.map((seg) => (
              <div className="" key={seg.duration}>
                <div>{seg.startime} hs</div>
                <div>{seg.endTime} hs</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
