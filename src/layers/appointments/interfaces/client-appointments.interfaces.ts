import { IAppointment } from "@/interfaces/appointments.interface";

export interface IClientAppointment
  extends Omit<IAppointment, "name" | "lastName"> {
  fullName: string;
}
