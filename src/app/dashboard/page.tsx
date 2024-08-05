import React, { Suspense } from "react";
import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import DashboardCard from "../components/dashboard/DashboardCard";
import ServicesList from "../components/dashboard/services-list";
import AddButton from "../components/dashboard/add-button";

export default async function page() {
  const user = await getServerSession(authOptions);
  return (
    <div className=" h-full flex flex-col  gap-4 ">
      <p className="text-lg">
        Bienvenido{" "}
        <strong>
          {user?.user.name}, {user?.user.lastName}{" "}
        </strong>
      </p>
      <section className="flex flex-col   flex-grow">
        <div className="flex py-4 gap-4  max-lg:flex-col  ">
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
