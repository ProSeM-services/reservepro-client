import { IAppointment } from "@/interfaces/appointments.interface";
import { IClientAppointment } from "../interfaces";

export function AppoitnemntModelAdapter(
  appointments: IAppointment[]
): IClientAppointment[] {
  return appointments
    .map((appointment) => ({
      ...appointment,
      fullName: `${appointment.name}, ${appointment.lastName}`,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
}
