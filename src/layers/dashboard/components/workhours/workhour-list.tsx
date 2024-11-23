"use client";
import { Input } from "@/components/ui/input";
import { IWorkhour, Segment } from "@/interfaces";
import React, { useState } from "react";
import { SegmentDay } from "./segment-day";
import { Button } from "@/components/ui/button";
interface WorkhourListProps {
  workhours: IWorkhour[];
}
export function WorkhourList({ workhours }: WorkhourListProps) {
  const [changed, setChanged] = useState(false);
  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "mié rcoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];
  const handleUpdateWorkhours = (day: number, position: number, value: any) => {
    let WH = workhours.find((e) => e.day === day);

    // const newSegmentValue = { ...WH?.segments[position], ...value };

    const newSegmentValue = WH?.segments.map((e, pos) => {
      if (pos === position) {
        return { ...e, ...value };
      }
      return e;
    });
    const newWH = {
      day,
      segments: newSegmentValue,
    };
  };
  return (
    <div className="flex flex-col gap-2 items-end">
      <div className={`flex gap-4 justify-around`}>
        {workhours.map(({ day, segments }) => (
          <div key={day} className=" flex flex-col gap-4 items-center">
            <p className=" font-bold uppercase  ">{DAYS[day].short}</p>
            <div className="flex flex-col items-center gap-2   ">
              {segments.map((seg, index) => (
                <SegmentDay
                  segment={seg}
                  key={index}
                  position={index}
                  day={day}
                  handleUpdate={handleUpdateWorkhours}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button>Actualizar</Button>
    </div>
  );
}
