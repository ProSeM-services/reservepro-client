"use client";
import { IWorkhour } from "@/interfaces";
import { useAppSelector } from "@/store/hooks";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
export function CurrentStatus() {
  const [workhours, setWorkhours] = useState<IWorkhour[]>([]);
  const { memberLogged, loading } = useAppSelector((s) => s.member);
  useEffect(() => {
    if (loading) return;
    if (memberLogged) {
      setWorkhours(memberLogged.workhours || []);
    }
  }, [memberLogged]);

  const today = new Date();
  const time = today.toLocaleTimeString();
  const todayNumber = today.getDay();
  const todaySegmnets = workhours.filter((wh) => wh.day === todayNumber)[0]
    ?.segments;
  if (!todaySegmnets) return null;
  const firstSegment = todaySegmnets[0];
  const lastSegment = todaySegmnets[todaySegmnets.length - 1];

  if (!lastSegment) return null;
  if (!firstSegment) return null;

  const arrayOfBooleans = todaySegmnets.map((segment) => {
    return segment.endTime > time && time > segment.startime;
  });

  const status = arrayOfBooleans.filter((e) => e).length > 0;
  return (
    <div
      className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium text-white ${
        status ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      <Clock />
      {today.toLocaleTimeString()}
    </div>
  );
}
