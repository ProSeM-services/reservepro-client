import { ICompany } from "@/interfaces";
import React from "react";

import { AxeIcon } from "lucide-react";
import ServiceCard from "@/layers/services/components/services-card";

export function CompnayServicesList({ company }: { company: ICompany }) {
  const services = company.Services;
  return (
    <div>
      {services?.length ? (
        <div className="grid grid-cols-2 gap-2 ">
          {services.map((service) => (
            <ServiceCard
              service={service}
              key={service.id}
              selectedCompany={company}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-background border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
          <AxeIcon className="size-10" />
          <p className="font-light text-sm w-60  text-center">
            No tienes servicios cargadados en esta sucursal.
          </p>
        </div>
      )}
    </div>
  );
}
