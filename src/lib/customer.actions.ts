"use server";
import { setAuthtoken } from "./actions";
import { revalidatePath } from "next/cache";
import { CustomerServices } from "@/services/customer.services";

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
