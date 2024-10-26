import React, { Suspense } from "react";
import { CompanyDetailPage } from "@/layers/company/page";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={"Loading ..."}>
      <CompanyDetailPage params={params} />
    </Suspense>
  );
}
