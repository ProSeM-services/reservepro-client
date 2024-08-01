import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IMember } from "@/interfaces/member.iterface";

export class MemberServices {
  static async getMembers(): Promise<IMember[]> {
    const res = await axiosInstance.get(`${BASE_URL}/members`);

    return res.data;
  }
  static async getFree(): Promise<IMember[]> {
    const res = await axiosInstance.get(`${BASE_URL}/members/free`);

    return res.data;
  }
  static async getCount(): Promise<number> {
    const res = await axiosInstance.get(`${BASE_URL}/members/count`);

    return res.data;
  }

  static async createMember(data: IMember) {
    const res = await axiosInstance.post(`${BASE_URL}/members`, data);

    return res.data;
  }
}
