"use client";
import { getAllAppointments } from "@/lib/appointments.actions";
import React, { useEffect, useState } from "react";
import { AppointmentsTable } from "../components";
import { AppoitnemntModelAdapter } from "../adapters";
import { IClientAppointment } from "../interfaces";
export function AppointmentPage() {
  const [appointmnets, setAppointmnets] = useState<IClientAppointment[]>([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getAllAppointments();

        setAppointmnets(AppoitnemntModelAdapter(res));
      } catch (error) {
        console.error("Error Loading appointmnets data", error);
      }
    };
    fetchAppointments();
  }, []);
  return (
    <div>
      <AppointmentsTable appointmnets={appointmnets} />
    </div>
  );
}
