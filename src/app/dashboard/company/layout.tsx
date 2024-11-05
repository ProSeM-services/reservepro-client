import { CompanyLinks } from "@/layers/company/components/company-links";
import { AddButton } from "@/layers/dashboard/components";
import React, { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <section className="flex max-lg:flex-col gap-2  h-full">
      <div className=" space-y-2  w-1/4 max-lg:w-full ">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Sucursales</p>
          <AddButton type="company" />
        </div>
        <CompanyLinks />
      </div>
      <div className="flex flex-col gap-3 flex-grow overflow-auto  max-h-full lg:max-w-[75%]  bg-background rounded-md p-6 border border-border">
        {children}
      </div>
    </section>
  );
}
