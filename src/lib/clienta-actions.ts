"use server";
import { ClientServices } from "@/services/client.services";
import { revalidatePath } from "next/cache";

export async function getClientComapnies({
  query,
  category,
  city,
}: {
  query: string;
  category: string;
  city: string;
}) {
  const companies = await ClientServices.getCompanies({
    query,
    category,
    city,
  });
  revalidatePath("/search");
  return companies;
}

export async function getClientCompanyData(id: string) {
  const companies = await ClientServices.getCompanyById(id);
  revalidatePath("/search");
  return companies;
}
export async function getClientServiceData(id: string) {
  const companies = await ClientServices.getServicesById(id);
  revalidatePath("/search");
  return companies;
}
export async function getClientMemberData(id: string) {
  const companies = await ClientServices.getMemberById(id);
  revalidatePath("/search");
  return companies;
}
export async function getCompnayServices(id: string) {
  const services = await ClientServices.getCompanyServices(id);
  revalidatePath("/search");
  return services;
}
export async function getCompanyMembers(id: string) {
  const members = await ClientServices.getCompanyMembers(id);
  revalidatePath("/search");
  return members;
}

export async function getServicesMembers(id: string) {
  const members = await ClientServices.getServiceMembers(id);
  revalidatePath("/search");
  return members;
}
