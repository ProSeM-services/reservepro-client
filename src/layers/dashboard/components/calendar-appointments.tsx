"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IAppointment } from "@/interfaces/appointments.interface";
import { useEffect, useState } from "react";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { AppointmentServices } from "@/services/appointment.services";
import { useSession } from "next-auth/react";
import { setAuthInterceptor } from "@/config/axios.config";
import { CalendarOffIcon, Clock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCalendarAppointments } from "@/store/feature/stats/statsSlices";

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
    <div className=" h-full w-1/3 flex flex-col items-center gap-2 bg-card  border border-border px-8 py-4 rounded-md ">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, "PPP", { locale: es })
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date ? date : new Date()}
            onSelect={(value) => value && setDate(new Date(value))}
            className="rounded-md mx-auto "
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <hr className="w-full" />
      <LoaderWrapper loading={loading} type="appointments">
        {fetched && appointments.length === 0 ? (
          <div className="flex flex-col items-center py-8 justify-center h-full text-gray-600">
            <CalendarOffIcon className="size-10" />
            <span className="font-medium">
              No hay turnos agendados para el{" "}
              {format(date, "P", { locale: es })}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-2 w-full">
            <p className="font-medium text-card-foreground">
              {date.toLocaleDateString()}
            </p>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-2 border-l-4 border-primary  bg-accent rounded-md text-card-foreground"
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
