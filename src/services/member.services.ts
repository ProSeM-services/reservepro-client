import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICreateMember, IMember } from "@/interfaces/member.iterface";

export class MemberServices {
  static async getMembers(): Promise<IMember[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);

    return res.data;
  }
  static async getFree(): Promise<IMember[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user/free`);

    return res.data;
  }
  static async getById(id: string): Promise<IMember> {
    const res = await axiosInstance.get(`${BASE_URL}/user/details/${id}`);

    return res.data;
  }
  static async getCount(): Promise<number> {
    const res = await axiosInstance.get(`${BASE_URL}/user/count`);

    return res.data;
  }

  static async createMember(data: ICreateMember) {
    const res = await axiosInstance.post(`${BASE_URL}/user`, data);

    return res.data;
  }
}
