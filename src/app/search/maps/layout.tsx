import HomeHeader from "@/layers/home/components/home-header";
import CompanyCard from "@/layers/search/components/company-card";
import { MapSearch } from "@/layers/search/page/maps/components";
import { ClusterMap } from "@/layers/search/page/maps/components/cluster-map";
import { CompaniesAside } from "@/layers/search/page/maps/components/companies-aside";
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
    <section className="flex flex-col max-lg:flex-col md:gap-2   h-screen  ">
      <HomeHeader>
        <div className="flex gap-1">
          <MapSearch />
          <section>
            <CompaniesAside companies={companies} />
          </section>
        </div>
      </HomeHeader>
      <div className="flex gap-4 h-[90%] md:p-1 ">
        <section className="w-1/4 p-4 space-y-4 max-md:hidden">
          <div className="flex justify-between items-center">
            <h2>Sucursales </h2>
            <Filter />
          </div>

          <div className="w-full overflow-auto  p-2 max-h-full space-y-5">
            {companies.map((company) => (
              <CompanyCard company={company} key={company.id} isOnMapPage />
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
