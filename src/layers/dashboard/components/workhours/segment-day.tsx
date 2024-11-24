"use client";
import { Input } from "@/components/ui/input";
import { Segment } from "@/interfaces";
import React, { useState } from "react";

interface SegmentDayProps {
  segment: Segment;
  day: number;
  position: number;
}
export function SegmentDay({ segment, day, position }: SegmentDayProps) {
  const [values, setValues] = useState<Segment>(segment);
  const handleEditWorkhours = (
    day: number,
    key: keyof Segment,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex  flex-col items-center" key={segment.duration}>
      <p>{values.startime}</p>
      <p>{values.endTime}</p>
    </div>
  );
}
