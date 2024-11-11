"use client";
import { CustomerStats } from "../components";
import { AppointmentStats } from "../components/appointment-stats";
import { CalnedarAppointments } from "../components/calendar-appointments";
import { MemberServices } from "../components/member-services";
import WorkhourInfo from "../components/workhours-info";

export default function NewDashboardPage() {
  return (
    <div className="h-full  flex flex-col gap-4">
      <header className="space-y-2 py-2">
        <h2 className="font-bold text-3xl text-gray-700">Hello, User!</h2>
        <MemberServices />
      </header>

      <section className=" w-full flex-grow flex justify-between gap-4">
        <div className="max-w-2/3 w-2/3   flex h-2/3  gap-4 ">
          <WorkhourInfo />
          <AppointmentStats />
          <CustomerStats />
        </div>
        <div className=" h-2/3   w-1/3 ">
          <CalnedarAppointments />
        </div>
      </section>
    </div>
  );
}
