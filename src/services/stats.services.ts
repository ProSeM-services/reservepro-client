import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ICustomerStat } from "@/layers/dashboard/models/customer-stats.interface";

export class StatsServices {
  static async getCustomerStats(
    start?: string,
    end?: string,
    year?: string
  ): Promise<ICustomerStat[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/stats/customers-by-month?start=${start || "09"}&end=${
        end || "11"
      }&year=${year || "2024"}`
    );
    return res.data;
  }
}
