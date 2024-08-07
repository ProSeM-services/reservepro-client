import { getClientComapnies } from "@/lib/clienta-actions";
import CompanyCard from "./company-card";

export default async function SearchTable({
  query,
  category,
  city,
}: {
  query: string;
  category: string;
  city: string;
  currentPage: number;
}) {
  const companies = await getClientComapnies({ query, category, city });

  return (
    <section className="  grid grid-cols-3 max-md:grid-cols-2 gap-2 flex-wrap max-w-full w-full  ">
      {companies?.map((company) => (
        <CompanyCard company={company} key={company._id} />
      ))}
    </section>
  );
}
