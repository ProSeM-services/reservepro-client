import React, { Suspense } from "react";
import CompanyList from "@/app/components/dashboard/company-list";
import MemberList from "@/app/components/dashboard/member-list";
import DashboardStats from "../components/dashboard/dashboard-stats";
import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";

export default async function page() {
  const user = await getServerSession(authOptions);
  return (
    <div className=" h-full  gap-4">
      <p className="text-lg">
        Bienvenido{" "}
        <strong>
          {" "}
          {user?.user.name}, {user?.user.lastName}{" "}
        </strong>
      </p>
      <div className="flex py-4 gap-4">
        <Suspense fallback={"Loading ..."}>
          <DashboardStats type="company" />
        </Suspense>
        <Suspense fallback={"Loading ..."}>
          <DashboardStats type="member" />
        </Suspense>
      </div>
      <hr />
      <div className="flex  flex-col py-2 ">
        <p className="font-bold text-lg text-accent-foreground">Sucursales</p>

        <Suspense fallback={"Loading ..."}>
          <CompanyList />
        </Suspense>
      </div>

      <div className="flex  flex-col py-2">
        <p className="font-bold text-lg text-accent-foreground">Miembros</p>

        <Suspense fallback={"Loading ..."}>
          <MemberList />
        </Suspense>
      </div>
    </div>
  );
}
