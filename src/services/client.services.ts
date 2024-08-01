import { BASE_URL } from "@/config/axios.config";
import { ICompany } from "@/interfaces";
import axios from "axios";

export class ClientServices {
  static async getCompanies({
    query,
    category,
    city,
  }: {
    query: string;
    category: string;
    city: string;
  }): Promise<ICompany[]> {
    const res = await axios.get(
      `${BASE_URL}/client/companies?name=${query}&category=${category}&city=${city}`
    );
    return res.data;
  }
}
