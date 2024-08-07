import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAddService, ICreateService, IService } from "@/interfaces";

export class ServicesServices {
  static async getAll(): Promise<IService[]> {
    const res = await axiosInstance.get(`${BASE_URL}/services`);

    return res.data;
  }
  static async createService(data: ICreateService): Promise<IService> {
    const res = await axiosInstance.post(`${BASE_URL}/services`, data);

    return res.data;
  }
  static async addToCompany(data: IAddService): Promise<IService> {
    const res = await axiosInstance.post(
      `${BASE_URL}/services/add-to-company`,
      data
    );

    return res.data;
  }
  static async removeFromCompany(data: IAddService): Promise<IService> {
    const res = await axiosInstance.post(
      `${BASE_URL}/services/remove-from-company`,
      data
    );

    return res.data;
  }
}
