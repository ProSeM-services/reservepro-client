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

export function DashboardPage() {
  return (
    <div className="h-full  flex flex-col    ">
      <DashboardHero />

      <div className=" h-[95%] flex justify-between  gap-4     ">
        <div className="h-full flex flex-col gap-4 flex-grow  ">
          <section className=" w-full h-[60%]  max-h-[60%]   ">
            <div className="w-full h-full grid grid-cols-3   gap-4 ">
              <CalnedarAppointments />
              <AppointmentStats />
              <CustomerStats />
            </div>
          </section>
          <section className=" rounded-lg w-full flex gap-4 h-[40%] max-h-[40%]   ">
            <div className="bg-card rounded h-full w-1/4  p-4 flex flex-col border border-border ">
              <div className="flex items-center justify-between font-bold">
                <h2>Notificaciones</h2>
                <BellDot />
              </div>

              <div className="flex-grow flex flex-col justify-center items-center text-gray-400">
                <BellMinus className="size-32" />
                <p className="">No hay notifiaciones por leer</p>
              </div>
            </div>
            <div className="w-3/4 max-w-3/4 bg-card rounded flex p-2 gap-4 border border-border">
              <div className=" w-1/2 rounded-md p-2  space-y-2">
                {" "}
                <div className="flex items-center justify-between font-bold">
                  <h2>Miembros</h2>
                  <div className="flex items-center gap-2">
                    <Users />
                    <AddButton type="member" />
                  </div>
                </div>
                <div className=" h-[90%] max-h-[90%] overflow-y-auto ">
                  <MemberList />
                </div>
              </div>
              <div className=" w-1/2 rounded-md p-2 space-y-2">
                {" "}
                <div className="flex items-center justify-between font-bold">
                  <h2>Sucursales</h2>
                  <div className="flex items-center gap-2">
                    <Building />
                    <AddButton type="company" />
                  </div>
                </div>
                <div className=" h-[90%] max-h-[90%] overflow-y-auto">
                  <CompanyList />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className=" h-full  w-1/6  ">
          <WorkhourInfo />
        </div>
      </div>
    </div>
  );
}
