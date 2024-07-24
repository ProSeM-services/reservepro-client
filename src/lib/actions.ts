"use server";
import { authOptions } from "@/config/auth.config";
import { setAuthInterceptor } from "@/config/axios.config";
import { IMember } from "@/interfaces/member.iterface";
import { CompanyServices } from "@/services/company.services";
import { MemberServices } from "@/services/member.services";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const setAuthtoken = async () => {
  const serverSession = await getServerSession(authOptions);

  if (serverSession?.backendTokens.accessToken) {
    await setAuthInterceptor(serverSession.backendTokens.accessToken);
  }
};

export async function getComapnies() {
  await setAuthtoken();
  const companies = await CompanyServices.getCompanies();
  revalidatePath("/dashboard");
  return companies;
}
export async function getMembers() {
  await setAuthtoken();

  const companies = await MemberServices.getMembers();
  revalidatePath("/dashboard");
  return companies;
}
export async function createMember(data: IMember) {
  await setAuthtoken();
  const res = await MemberServices.createMember(data);
  revalidatePath("/dashboard");

  return res;
}

export const clearCookies = () => {
  const cookieStore = cookies();
  const cookiesNames = cookieStore.getAll().map((cookie) => cookie.name);
  console.log(cookiesNames);

  cookiesNames.forEach((e) => cookieStore.delete(e));
  console.log(cookiesNames);
};
