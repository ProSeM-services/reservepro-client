import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAppointment } from "@/interfaces/appointments.interface";

export class AppointmentServices {
  static async getAll(): Promise<IAppointment[]> {
    const res = await axiosInstance.get(`${BASE_URL}/appointments`);
    return res.data;
  }
  static async getAvialablesTimes({
    UserId,
    date,
    duration,
  }: {
    UserId: string;
    date: string;
    duration: string;
  }) {
    const res = await axiosInstance.post(
      `${BASE_URL}/appointments/member-slots`,
      {
        UserId,
        date,
        duration,
      }
    );
    return res.data;
  }
  static async createAppointment(): Promise<IAppointment[]> {
    const res = await axiosInstance.post(`${BASE_URL}/appointments`);
    return res.data;
  }
  static async getByEmail(id: string): Promise<IAppointment[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/appointments/customer/${id}`
    );
    return res.data;
  }
}
