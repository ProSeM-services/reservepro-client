"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IService } from "@/interfaces";
import { IAppointment } from "@/interfaces/appointments.interface";
import { FromatedDate } from "@/lib/format-date";
import { AppointmentServices } from "@/services/appointment.services";
import React, { useEffect, useState } from "react";
import AppointmentDataSkeleton from "./appointment-skeleton";
import CancelConfirmation from "./cancel-confirmation";
import { CalendarX2 } from "lucide-react";

export default function AppointmentData({ token }: { token: string }) {
  const [appointment, setAppointment] = useState<
    IAppointment & { Service: IService }
  >();
  const [loading, setLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [canceling, setCanceling] = useState(false);
  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);
        const res = await AppointmentServices.getBytoken(token);
        setIsCanceled(res.canceled ? res.canceled : false);
        setAppointment(res);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, []);

  const handleCancel = async () => {
    if (!appointment) return;
    try {
      setCanceling(true);
      await AppointmentServices.cancelAppointment(appointment.id);
      setIsCanceled(true);
    } catch (error) {
    } finally {
      setCanceling(false);
    }
  };

  if (loading) return <AppointmentDataSkeleton />;
  if (!appointment) return;
  if (isCanceled) return <CancelConfirmation />;
  return (
    <Card className="flex flex-col md:w-[30vw] w-[95%] rounded-none gap-4 p-4 max-md:border-none">
      <header>
        <p className="font-bold text-xl text-gray-700">
          ¿Quieres cancelar el turno?
        </p>
        <p className="text-gray-400">
          Una vez cancelado el turno, recibirás un mail a{" "}
          <b>{appointment.email}</b> confirmando la cancelación del mismo. Por
          favor, verificar esto último.
        </p>
      </header>

      <hr />
      <div className="text-gray-500 space-y-2">
        <h2>Datos del turno</h2>
        <div className="px-2">
          <Label className="text-lg">
            {appointment.name}, {appointment.lastName}
          </Label>
          <p>{appointment.time} hs</p>
          <p>
            <FromatedDate date={appointment.date} />
          </p>
          <p>Servicio: {appointment.Service.title}</p>
        </div>
      </div>

      <Button
        variant={"destructive"}
        disabled={!appointment || canceling}
        onClick={handleCancel}
        isLoading={canceling}
        className="flex gap-2  items-center"
      >
        <CalendarX2 className="size-4" />
        <p>Cancelar turno</p>
      </Button>
    </Card>
  );
}
