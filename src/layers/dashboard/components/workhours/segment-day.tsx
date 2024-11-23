"use client";
import { Input } from "@/components/ui/input";
import { Segment } from "@/interfaces";
import React, { useState } from "react";

interface SegmentDayProps {
  segment: Segment;
  day: number;
  position: number;
  handleUpdate: (day: number, position: number, value: any) => void;
}
export function SegmentDay({
  segment,
  day,
  handleUpdate,
  position,
}: SegmentDayProps) {
  const [values, setValues] = useState<Segment>(segment);
  const handleEditWorkhours = (
    day: number,
    key: keyof Segment,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    handleUpdate(day, position, { [key]: value });
  };

  return (
    <div className="flex  flex-col items-center" key={segment.duration}>
      <Input
        value={values.startime}
        onChange={(e) => handleEditWorkhours(day, "startime", e.target.value)}
      />
      <Input
        value={values.endTime}
        onChange={(e) => handleEditWorkhours(day, "endTime", e.target.value)}
      />
    </div>
  );
}
