import React from "react";
import {
  AddButton,
  CustomerStats,
  DashboardCard,
  ServicesList,
} from "../components";

export function DashboardPage() {
  return (
    <div className=" h-[100%] flex flex-col  gap-4  ">
      <section className="flex flex-col  gap-4  h-full">
        <div className="flex  gap-4  max-lg:flex-col  md:h-1/2  ">
          <DashboardCard type="company" />
          <DashboardCard type="member" />
        </div>

        <section className="flex max-md:flex-col gap-4 ,md:h-1/2 ">
          <div className=" h-1/3  space-y-2 md:w-1/2   ">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Servicios</h2>
              <AddButton type="services" />
            </div>
            <hr />
            <div className="max-md:max-h-full max-md:overflow-auto">
              <ServicesList />
            </div>
          </div>
          <div className=" h-full md:w-1/2 grid place-items-center">
            <CustomerStats />
          </div>
        </section>
      </section>
    </div>
  );
}
