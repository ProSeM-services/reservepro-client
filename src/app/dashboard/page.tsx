import React, { Suspense } from "react";
import { DashboardPage } from "@/layers/dashboard/page";

export default async function page() {
  return (
    <Suspense fallback={"Loading ..."}>
      <DashboardPage />
    </Suspense>
  );
}
