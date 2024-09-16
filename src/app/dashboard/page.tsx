import React, { Suspense } from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import ServicesList from "../components/dashboard/services-list";
import AddButton from "../components/dashboard/add-button";

export default async function page() {
  return (
    <div className=" h-full flex flex-col  gap-4 ">
      <section className="flex flex-col  gap-4 flex-grow">
        <div className="flex  gap-4  max-lg:flex-col  ">
          <DashboardCard type="company" />
          <DashboardCard type="member" />
        </div>

        <div className=" h-1/3  space-y-2    ">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Servicios</h2>
            <AddButton type="services" />
          </div>
          <hr />

          <Suspense fallback={"Loading ..."}>
            <ServicesList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
