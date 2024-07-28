import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { IMember } from "@/interfaces/member.iterface";

export class MemberServices {
  static async getMembers(): Promise<IMember[] | undefined> {
    try {
      const res = await axiosInstance.get(`${BASE_URL}/members`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
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
