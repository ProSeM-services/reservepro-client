import React, { Suspense } from "react";
import DashboardStats from "./dashboard-stats";
import List from "./dashboard-list";

export default function DashboardCard({
  type,
}: {
  type: "member" | "company";
}) {
  return (
    <div className="flex flex-col   w-1/2 max-lg:w-full bg-background p-2 border border-accent rounded-md  ">
      <Suspense fallback={"Loading ..."}>
        <DashboardStats type={type} />
      </Suspense>
      <Suspense fallback={"Loading ..."}>
        <div className="flex-grow  max-h-[30vh]">
          <List type={type} />
        </div>
      </Suspense>
    </div>
  );
}
