import dynamic from "next/dynamic";
import {
  CustomerStats,
  MemberList,
  List,
  DashboardHero,
  AddButton,
} from "../components";
import { CalnedarAppointments } from "../components/calendar-appointments";
import WorkhourInfo from "../components/workhours-info";
import { BellDot, BellMinus, Building, Users } from "lucide-react";
import { CompanyList } from "../components/company-list";
import { AppointmentStats } from "../components/appointment-stats";
import { Card, CardTitle } from "@/components/ui/card";

export function DashboardPage() {
  return (
    <div className="h-full w-full  flex flex-col    text-xs ">
      <DashboardHero />

      <div className="  max-w-[92vw]   w-[92vw]  overflow-x-hidden   ">
        <div className="h-full flex flex-col gap-2    ">
          <section className=" max-w-full    grid grid-cols-3    justify-start  gap-2    ">
            <CalnedarAppointments />
            <AppointmentStats />
            <CustomerStats />
          </section>
          <section className=" h-80  w-full max-w-full flex gap-4      ">
            <Card className="bg-card rounded h-full w-1/4  p-4 flex flex-col border border-border ">
              <div className="flex items-center justify-between font-bold">
                <CardTitle>Notificaciones</CardTitle>
                <BellDot />
              </div>

              <div className="flex-grow flex flex-col justify-center items-center text-gray-400">
                <BellMinus className="size-32" />
                <p className="">No hay notifiaciones por leer</p>
              </div>
            </Card>
            <div className="w-3/4 max-w-3/4  flex  gap-4 ">
              <Card className=" w-1/2 rounded-md p-2  space-y-2">
                {" "}
                <div className="flex items-center justify-between font-bold">
                  <CardTitle>Miembros</CardTitle>
                  <div className="flex items-center gap-2">
                    <Users />
                    <AddButton type="member" />
                  </div>
                </div>
                <div className=" h-[90%] max-h-[90%] overflow-y-auto ">
                  <MemberList />
                </div>
              </Card>
              <Card className=" w-1/2 rounded-md p-2 space-y-2">
                {" "}
                <div className="flex items-center justify-between font-bold">
                  <CardTitle>Sucursales</CardTitle>
                  <div className="flex items-center gap-2">
                    <Building />
                    <AddButton type="company" />
                  </div>
                </div>
                <div className=" h-[90%] max-h-[90%] overflow-y-auto">
                  <CompanyList />
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
