"use cliient";

import { Button } from "@/components/ui/button";
import { cancelAppointment } from "@/lib/appointments.actions";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface CancelAppointmentProps {
  appointmentId: string;
}
export function CancelAppointment({ appointmentId }: CancelAppointmentProps) {
  const [loading, setLoading] = useState(false);
  const handleCancelAppointment = async () => {
    try {
      setLoading(true);
      await cancelAppointment(appointmentId);
      console.log("Appointment canceled");
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
