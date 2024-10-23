import { IAppointment } from "@/interfaces/appointments.interface";
import MemberInfo from "./MemberInfo";
import { Suspense } from "react";
import { CalendarIcon, ClockIcon, TimerReset } from "lucide-react";
import ServiceDetail from "./service-details";

export default function AppointmentList({
  apointments,
}: {
  apointments: IAppointment[];
}) {
  return (
    <div className="flex flex-wrap gap-4 text-[15px]   p-2 ">
      {apointments.map((app) => (
        <Suspense
          fallback={
            <div
              className=" bg-background  w-full  p-4 rounded-md border border-border space-y-2"
              key={app.id}
            >
              cargandoo..
            </div>
          }
          key={app.id}
        >
          <div
            className=" bg-background  w-full  p-4 rounded-md border border-border space-y-2"
            key={app.id}
          >
            <div className="flex items-center justify-between ">
              <MemberInfo memberId={app.memberId} />
              <p
                className={`${
                  app.canceled ? "bg-destructive" : "bg-green-500 "
                }  rounded-md w-24 h-6 text-white flex justify-center items-center`}
              >
                {app.canceled ? "cancelado" : "activo"}
              </p>
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <ServiceDetail servieId={app.serviceId} />
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="size-4" />
                <p> {app.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4" />
                <p> {new Date(app.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <TimerReset className="size-4" />
                <p> {app.duration} min</p>
              </div>
            </div>

            <div className=" flex items-center gap-2 justify-end text-gray-500 ">
              <p>{new Date(app.createdAt).toLocaleDateString()}</p>
              <p>{new Date(app.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        </Suspense>
      ))}
    </div>
  );
}
