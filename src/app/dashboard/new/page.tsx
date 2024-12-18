import { Card, CardTitle } from "@/components/ui/card";
import {
  AddButton,
  CustomerStats,
  MemberList,
} from "@/layers/dashboard/components";
import { AppointmentStats } from "@/layers/dashboard/components/appointment-stats";
import { CalnedarAppointments } from "@/layers/dashboard/components/calendar-appointments";
import { CompanyList } from "@/layers/dashboard/components/company-list";
import { Users } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className=" w-full rounded-md p-2  space-y-2">
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
          <Card className=" w-full rounded-md p-2  space-y-2">
            {" "}
            <div className="flex items-center justify-between font-bold">
              <CardTitle>Sucursales</CardTitle>
              <div className="flex items-center gap-2">
                <Users />
                <AddButton type="company" />
              </div>
            </div>
            <div className=" h-[90%] max-h-[90%] overflow-y-auto ">
              <CompanyList />
            </div>
          </Card>
          <CalnedarAppointments />
        </div>
        <div className="min-h-[100vh] flex gap-4 flex-1 rounded-xl  md:min-h-min">
          <AppointmentStats />
          <CustomerStats />
        </div>
      </div>
    </div>
  );
}
