"use client";
import SercvicesList from "@/layers/booking/components/services-list";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { ProfesionalList } from "../components/profesional-list";
import { SelectDate } from "../components/select-date";

export function BookingPage() {
  const { step } = useAppSelector((s) => s.booking);

  return (
    <section className=" w-full h-full  ">
      {step === 0 && <SercvicesList readonly={false} />}
      {step === 1 && <ProfesionalList />}
      {step === 2 && <SelectDate />}
      {step === 3 && <SercvicesList readonly={false} />}
      {step === 4 && <SercvicesList readonly={false} />}
    </section>
  );
}
