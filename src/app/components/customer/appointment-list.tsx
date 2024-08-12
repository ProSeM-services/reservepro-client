import { IAppointment } from "@/interfaces/appointments.interface";
import { UserIcon } from "lucide-react";

export default function AppointmentList({
  apointments,
}: {
  apointments: IAppointment[];
}) {
  return (
    <div className="flex flex-wrap gap-4 text-[15px]   p-2 ">
      {apointments.map((app) => (
        <div
          className=" bg-background  w-full  p-4 rounded-md border border-border space-y-2"
          key={app._id}
        >
          <div className="flex items-center justify-between ">
            <div className="flex  items-center  font-semibold">
              <UserIcon />
              {app.member.name}, {app.member.lastName}
            </div>
            <p
              className={`${
                app.canceled ? "bg-destructive" : "bg-green-500 "
              }  rounded-md w-24 h-6 text-white flex justify-center items-center`}
            >
              {app.canceled ? "cancelado" : "activo"}
            </p>
          </div>
          <div>
            <p>Horario: {app.time}</p>
            <p>Dia: {new Date(app.date).toLocaleDateString()}</p>
          </div>

          <div className=" flex items-center gap-2 justify-end text-gray-500 ">
            <p>{new Date(app.createdAt).toLocaleDateString()}</p>
            <p>{new Date(app.createdAt).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
