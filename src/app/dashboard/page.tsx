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
        <div className="w-1/2 bg-background p-2 border border-accent rounded-md">
          <Suspense fallback={"Loading ..."}>
            <DashboardStats type="company" />
            <Suspense fallback={"Loading ..."}>
              <CompanyList />
            </Suspense>
          </Suspense>
        </div>
        <div className="w-1/2 bg-background p-2 border border-accent rounded-md">
          <Suspense fallback={"Loading ..."}>
            <DashboardStats type="member" />
          </Suspense>

          <Suspense fallback={"Loading ..."}>
            <MemberList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
