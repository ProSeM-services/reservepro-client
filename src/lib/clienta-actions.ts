import { ClientServices } from "@/services/client.services";
import { revalidatePath } from "next/cache";
import { stringify } from "postcss";

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
