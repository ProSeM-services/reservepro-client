"use client";
import SercvicesList from "@/layers/booking/components/services-list";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { ProfesionalList } from "../components/profesional-list";
import { SelectDate } from "../components/select-date";
import { ClientFormSection } from "../components/client-form-section";
import ConfirmationPage from "../components/confirmation-page";

export function BookingPage() {
  const { step } = useAppSelector((s) => s.booking);

  return (
    <section className=" w-full h-full    ">
      {step === 0 && <SercvicesList readonly={false} />}
      {step === 1 && <ProfesionalList />}
      {step === 2 && <SelectDate />}
      {step === 3 && <ClientFormSection />}
      {step === 4 && <ConfirmationPage />}
    </section>
  );
}
