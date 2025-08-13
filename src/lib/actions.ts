"use server";
import { authOptions } from "@/config/auth.config";
import { setAuthInterceptor } from "@/config/axios.config";
import {
  IAddMember,
  IAddMemberToService,
  IAddService,
  ICreateCompany,
  ICreateService,
} from "@/interfaces";
import { ICreateMember } from "@/interfaces/member.iterface";
import { CompanyServices } from "@/services/company.services";
import { CustomerServices } from "@/services/customer.services";
import { MemberServices } from "@/services/member.services";
import { ServicesServices } from "@/services/services.services";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const setAuthtoken = async () => {
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

export async function getCustomers() {
  await setAuthtoken();
  const customers = await CustomerServices.getAll();
  revalidatePath("/dashboard");
  return customers;
}
export async function getCustomerById(id: string) {
  await setAuthtoken();
  const customer = await CustomerServices.getById(id);
  revalidatePath("/dashboard");
  return customer;
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
export async function getMembersFromCompany(id: string) {
  await setAuthtoken();
  const companies = await CompanyServices.getMembers(id);
  return companies;
}
export async function getServicesFromCompany(id: string) {
  await setAuthtoken();
  const companies = await CompanyServices.getServices(id);
  return companies;
}
export async function deleteCompany(id: string) {
  await setAuthtoken();
  const companies = await CompanyServices.delete(id);
  revalidatePath("/dashboard");
  return companies;
}

export async function getMembers() {
  await setAuthtoken();

  const members = await MemberServices.getMembers();
  revalidatePath("/dashboard");
  return members;
}
export async function getMemberById(id: string) {
  await setAuthtoken();
  const member = await MemberServices.getById(id);
  revalidatePath("/dashboard");
  return member;
}
export async function getServices() {
  await setAuthtoken();

  const services = await ServicesServices.getAll();
  revalidatePath("/dashboard");
  return services;
}
export async function getServicesById(id: string) {
  await setAuthtoken();

  const services = await ServicesServices.getById(id);
  revalidatePath("/dashboard");
  return services;
}
export async function getMembersFromServices(id: string) {
  await setAuthtoken();

  const services = await ServicesServices.getMembers(id);
  revalidatePath("/dashboard");
  return services;
}
export async function createService(data: ICreateService) {
  await setAuthtoken();

  const services = await ServicesServices.createService(data);
  revalidatePath("/dashboard");
  return services;
}
export async function addMemberToService(data: IAddMemberToService) {
  await setAuthtoken();
  const res = await ServicesServices.addMember(data);
  revalidatePath("/dashboard");
  return res;
}
export async function removeMemberFromService(data: IAddMemberToService) {
  await setAuthtoken();
  const res = await ServicesServices.removeMember(data);
  revalidatePath("/dashboard");
  return res;
}
export async function addServiceToComapny(data: IAddService) {
  await setAuthtoken();
  const res = await ServicesServices.addToCompany(data);
  revalidatePath("/dashboard");
  return res;
}
export async function removeServiceFromComapny(data: IAddService) {
  await setAuthtoken();
  const res = await ServicesServices.removeFromCompany(data);
  revalidatePath("/dashboard");
  return res;
}
export async function getFreeMembers() {
  await setAuthtoken();

  const members = await MemberServices.getFree();
  return members;
}
export async function createMember(data: ICreateMember) {
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
export async function removeMemberFromCompany(data: IAddMember) {
  await setAuthtoken();
  const res = await CompanyServices.removeMember(data);
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
