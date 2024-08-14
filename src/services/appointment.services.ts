import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAppointment } from "@/interfaces/appointments.interface";

export class AppointmentServices {
  static async getAll(): Promise<IAppointment[]> {
    const res = await axiosInstance.get(`${BASE_URL}/appointments`);
    return res.data;
  }
  static async getByEmail(email: string): Promise<IAppointment[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/appointments/email/${email}`
    );
    return res.data;
  }
}
