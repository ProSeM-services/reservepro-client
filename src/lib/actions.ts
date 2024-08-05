"use server";
import { authOptions } from "@/config/auth.config";
import { setAuthInterceptor } from "@/config/axios.config";
import {
  IAddMember,
  IAddService,
  ICreateCompany,
  ICreateService,
} from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { CompanyServices } from "@/services/company.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import axios from "axios";
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

export async function companiesCount() {
  await setAuthtoken();
  const count = await CompanyServices.getCount();
  revalidatePath("/dashboard");
  return count;
}
export async function membersCount() {
  await setAuthtoken();
  const count = await MemberServices.getCount();
  revalidatePath("/dashboard");
  return count;
}
export async function getCompanyData(id: string) {
  await setAuthtoken();
  const companies = await CompanyServices.getCopanyById(id);
  return companies;
}
export async function getMembers() {
  await setAuthtoken();

  const members = await MemberServices.getMembers();
  revalidatePath("/dashboard");
  return members;
}
export async function getServices() {
  await setAuthtoken();

  const services = await ServicesServices.getAll();
  revalidatePath("/dashboard");
  return services;
}
export async function createService(data: ICreateService) {
  await setAuthtoken();

  const services = await ServicesServices.createService(data);
  revalidatePath("/dashboard");
  return services;
}
export async function addServiceToComapny(data: IAddService) {
  await setAuthtoken();
  const res = await ServicesServices.addToCompany(data);
  revalidatePath("/dashboard");
  return res;
}
export async function getFreeMembers() {
  await setAuthtoken();

  const members = await MemberServices.getFree();
  return members;
}
export async function createMember(data: IMember) {
  await setAuthtoken();
  const res = await MemberServices.createMember(data);
  revalidatePath("/dashboard");

  return res;
}
export async function createCompany(data: ICreateCompany) {
  await setAuthtoken();
  const res = await CompanyServices.createcompany(data);
  revalidatePath("/dashboard");

  return res;
}

export async function addMemberToCompany(data: IAddMember) {
  await setAuthtoken();
  const res = await CompanyServices.addMember(data);
  revalidatePath("/dashboard");
  return res;
}

export const clearCookies = () => {
  const cookieStore = cookies();
  const cookiesNames = cookieStore.getAll().map((cookie) => cookie.name);

  cookiesNames.forEach((e) => cookieStore.delete(e));
};

export const getGeocodeLocation = async function (address: string) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: process.env.NEXT_PUBLIC_APIMAPS,
        },
      }
    );

    if (response.data.status !== "OK") {
      throw new Error(`Geocodificación fallida: ${response.data.status}`);
    }

    const location = response.data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    throw new Error("Error en la geocodificación: ");
  }
};
