"use cliient";

import useFetchData from "@/app/hooks/useFetchData";
import { Button } from "@/components/ui/button";
import { AppointmentServices } from "@/services/appointment.services";
import { cancleAppointment } from "@/store/feature/appointnments/appointmentsSlice";
import { useAppDispatch } from "@/store/hooks";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface CancelAppointmentProps {
  appointmentId: string;
}
export function CancelAppointment({ appointmentId }: CancelAppointmentProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { fetchAppointments } = useFetchData();
  const handleCancelAppointment = async () => {
    try {
      setLoading(true);
      await AppointmentServices.cancelAppointment(appointmentId);
      await fetchAppointments();
    } catch (error) {
      console.log("error canceling appointment", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      className="size-6"
      onClick={handleCancelAppointment}
      isLoading={loading}
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
