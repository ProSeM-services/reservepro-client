import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IAddMember, ICompany, ICreateCompany } from "@/interfaces";

export class CompanyServices {
  static async getCompanies(): Promise<ICompany[]> {
    const res = await axiosInstance.get(`${BASE_URL}/company`);

    return res.data;
  }
  static async getCount(): Promise<number> {
    const res = await axiosInstance.get(`${BASE_URL}/company/count`);

    return res.data;
  }

  static async getCopanyById(id: string): Promise<ICompany> {
    const res = await axiosInstance.get(`${BASE_URL}/company/details/${id}`);

    return res.data;
  }
  static async createcompany(data: ICreateCompany): Promise<ICompany> {
    const res = await axiosInstance.post(`${BASE_URL}/company`, data);

    return res.data;
  }
  static async addMember(data: IAddMember): Promise<ICompany | undefined> {
    const res = await axiosInstance.post(
      `${BASE_URL}/company/add-member`,
      data
    );

    return res.data;
  }
}
