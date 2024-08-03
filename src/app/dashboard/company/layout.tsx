import CompanyLinks from "@/app/components/company/company-links";
import { getComapnies } from "@/lib/actions";
import React, { PropsWithChildren } from "react";

export default async function Page({ children }: PropsWithChildren) {
  const allComapnies = await getComapnies();

  return (
    <section className="flex max-lg:flex-col gap-2  h-full">
      <div className="flex flex-col gap-4 w-1/4 max-lg:w-full p-6">
        <p className="font-semibold text-lg">Sucursales</p>
        <hr />
        <CompanyLinks companies={allComapnies} />
      </div>
      <div className="flex flex-col gap-3 flex-grow overflow-auto  max-h-full lg:max-w-[75%]  bg-background rounded-md p-6 border border-border">
        {children}
      </div>
    </section>
  );
}
