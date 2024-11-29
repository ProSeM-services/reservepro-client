import HomeHeader from "@/layers/home/components/home-header";
import CompanyCard from "@/layers/search/components/company-card";
import { ClusterMap } from "@/layers/search/page/maps/components/cluster-map";
import { getClientComapnies } from "@/lib/clienta-actions";
import { Filter } from "lucide-react";
import React, { ReactNode } from "react";
interface PageProps {
  children: ReactNode;
}
export default async function Page({ children }: PageProps) {
  const companies = await getClientComapnies({
    query: "",
    category: "",
    city: "",
  });
  return (
    <section className="flex flex-col max-lg:flex-col gap-2  h-screen  ">
      <HomeHeader>
        <div></div>
      </HomeHeader>
      <div className="flex gap-4 h-[90%] p-1 outlin">
        <section className="w-1/4 p-1">
          <div className="flex justify-between items-center">
            <h2>Sucursales </h2>
            <Filter />
          </div>

          <div className="w-full overflow-auto  p-2 max-h-full space-y-5">
            {companies.map((company) => (
              <CompanyCard company={company} />
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-3 flex-grow overflow-auto  max-h-full   bg-background rounded-md border border-border">
          <ClusterMap />
        </div>
      </div>
    </section>
  );
}
