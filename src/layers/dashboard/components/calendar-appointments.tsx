"use client";
import { IAppointment } from "@/interfaces/appointments.interface";
import { useEffect, useState } from "react";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { AppointmentServices } from "@/services/appointment.services";
import { useSession } from "next-auth/react";
import { setAuthInterceptor } from "@/config/axios.config";
import { CalendarOffIcon, Clock } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

export function CalnedarAppointments() {
  const session = useSession();

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    const fetch = async () => {
      try {
        setLoading(true);
        setFetched(false);
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        const res = await AppointmentServices.getByUser(
          session.data.user.id,
          date.toISOString()
        );
        setAppointments(res);
      } catch (error) {
        console.log("Error fetching today appointments : ", error);
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };

    fetch();
  }, [session.data, date]);

  return (
    <div className=" h-full flex flex-col items-center gap-2   bg-background px-8 py-4 rounded-md ">
      <Calendar
        mode="single"
        selected={date ? date : new Date()}
        onSelect={(value) => value && setDate(new Date(value))}
        className="rounded-md mx-auto "
      />

      <hr className="w-full" />
      <LoaderWrapper loading={loading} type="appointments">
        {fetched && appointments.length === 0 ? (
          <div className="flex flex-col items-center py-8 justify-center h-full text-gray-600">
            <CalendarOffIcon className="size-10" />
            <span className="font-medium">
              No hay turnos agendados para el {date.toLocaleDateString()}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-2 w-5/6">
            <p className="font-medium text-gray-800">
              {date.toLocaleDateString()}
            </p>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="px-2 border-l-2 border-purple-500  text-gray-700"
              >
                <p className="font-medium ">
                  {appointment.name}, {appointment.lastName}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </LoaderWrapper>
    </div>
  );
}
