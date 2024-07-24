import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICompany } from "@/interfaces";

export class CompanyServices {
  static async getCompanies(): Promise<ICompany[] | undefined> {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/company`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
