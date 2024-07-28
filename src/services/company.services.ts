import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICompany, ICreateCompany } from "@/interfaces";

export class CompanyServices {
  static async getCompanies(): Promise<ICompany[]> {
    const res = await axiosInstance.get(`${BASE_URL}/company`);

    return res.data;
  }
  static async getCount(): Promise<number> {
    const res = await axiosInstance.get(`${BASE_URL}/company/count`);

    return res.data;
  }
  static async getCopanyById(id: string): Promise<ICompany | undefined> {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/company/details/${id}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createcompany(
    data: ICreateCompany
  ): Promise<ICompany | undefined> {
    try {
      const res = await axiosInstance.post(`${BASE_URL}/company`, data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
