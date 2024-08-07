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
