"use client";
import dynamic from "next/dynamic";

import { CustomerStats } from "../components";
import { CalnedarAppointments } from "../components/calendar-appointments";
import { MemberServices } from "../components/member-services";
import WorkhourInfo from "../components/workhours-info";
import { BellDot, BellMinus, MessageCircleDashed } from "lucide-react";
// Usamos dynamic para cargar AppointmentStats solo en el cliente
const AppointmentStats = dynamic(
  () =>
    import("../components/appointment-stats").then(
      (mod) => mod.AppointmentStats
    ),
  {
    ssr: false, // Desactivar SSR para este componente
  }
);
export default function NewDashboardPage() {
  return (
    <div className="h-full  flex flex-col gap-4">
      <header className="space-y-2 py-2">
        <h2 className="font-bold text-3xl text-gray-700">Hello, User!</h2>
        <MemberServices />
      </header>

      <div className=" h-full flex justify-between  gap-4   ">
        <div className="h-full flex flex-col gap-4 flex-grow">
          <section className=" w-full h-[60%]   gap-4 ">
            <div className="w-full h-full flex   gap-4 ">
              <CalnedarAppointments />
              <AppointmentStats />
              <CustomerStats />
            </div>
          </section>
          <section className=" rounded-lg w-full flex gap-4 flex-grow ">
            <div className="border rounded h-full w-1/3 bg-background p-4 flex flex-col ">
              <div className="flex items-center justify-between font-bold">
                <h2>Notificaciones</h2>
                <BellDot />
              </div>

              <div className="flex-grow flex flex-col justify-center items-center text-gray-400">
                <BellMinus className="size-32" />
                <p className="">No hay notifiaciones por leer</p>
              </div>
            </div>
            <div className="flex-grow bg-background rounded "></div>
          </section>
        </div>
        <div className=" h-full  w-1/6 ">
          <WorkhourInfo />
        </div>
      </div>
    </div>
  );
}
