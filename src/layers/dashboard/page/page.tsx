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
        <div className="flex  gap-4  max-lg:flex-col  h-1/2  ">
          <DashboardCard type="company" />
          <DashboardCard type="member" />
        </div>

        <section className="flex gap-4 h-1/2 ">
          <div className=" h-1/3  space-y-2 w-1/2   ">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Servicios</h2>
              <AddButton type="services" />
            </div>
            <hr />

            <ServicesList />
          </div>
          <div className=" h-full w-1/2 grid place-items-center">
            <CustomerStats />
          </div>
        </section>
      </section>
    </div>
  );
}
