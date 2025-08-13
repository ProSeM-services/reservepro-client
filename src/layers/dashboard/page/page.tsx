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
      <section className="h-10">
        <DashboardHero />
      </section>

      <div className="flex gap-4 w-full max-w-full h-full  overflow-x-hidden    ">
        <div className="flex flex-col gap-4 w-1/4">
          <CalnedarAppointments />
          <Card className="bg-card rounded h-full w-full p-4 flex flex-col border border-border ">
            <div className="flex items-center justify-between font-bold">
              <CardTitle>Notificaciones</CardTitle>
              <BellDot />
            </div>

            <div className="flex-grow flex flex-col justify-center items-center text-gray-400">
              <BellMinus className="size-32" />
              <p className="">No hay notifiaciones por leer</p>
            </div>
          </Card>
        </div>
        <div className=" grid grid-cols-2  w-3/4 gap-4   ">
          <section>
            <AppointmentStats />
          </section>
          <section>
            <CustomerStats />
          </section>
          <Card className=" rounded-md p-2  space-y-2">
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
          <Card className="  rounded-md p-2 space-y-2">
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
      </div>
    </div>
  );
}
