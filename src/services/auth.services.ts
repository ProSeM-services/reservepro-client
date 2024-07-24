import { BASE_URL } from "@/config/axios.config";
import { ITentant } from "@/interfaces/member.iterface";
import axios from "axios";

export class AuthServices {
  static async login(data: unknown) {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);

    return response.data;
  }
  static async register(data: ITentant): Promise<ITentant> {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);

    return response.data;
  }
}
