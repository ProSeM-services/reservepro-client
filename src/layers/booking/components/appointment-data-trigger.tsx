"use client";
import { useAppSelector } from "@/store/hooks";
import { AlignRightIcon, CalendarCheck } from "lucide-react";
import React from "react";

export function AppointmentDataTrigger() {
  const {
    bookingData: { companyId, date, member, service, time },
    step,
  } = useAppSelector((s) => s.booking);

  const ableToSet = member && time && service && date && companyId;

  if (step > 2) return null;
  return (
    <div
      className={`  text-[15px] ${
        ableToSet ? " bg-primary text-white" : "bg-accent"
      }  p-2 rounded-md transition-all duration-300 text-center flex justify-center `}
    >
      {" "}
      {ableToSet ? (
        <CalendarCheck className="size-5" />
      ) : (
        <AlignRightIcon className="size-5" />
      )}{" "}
    </div>
  );
}
