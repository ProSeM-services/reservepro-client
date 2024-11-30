"use server";
import { AppointmentServices } from "@/services/appointment.services";
import { setAuthtoken } from "./actions";
import { revalidatePath } from "next/cache";

export async function getAppointmentsByEmail(email: string) {
  await setAuthtoken();
  const appointments = await AppointmentServices.getByEmail(email);
  revalidatePath("/dashboard");
  return appointments;
}

export async function getAllAppointments() {
  await setAuthtoken();
  const { appointments } = await AppointmentServices.getAll();
  revalidatePath("/dashboard");
  return appointments;
}

export async function cancelAppointment(id: string) {
  await setAuthtoken();
  const appointments = await AppointmentServices.cancelAppointment(id);
  revalidatePath("/dashboard");
  return appointments;
}
