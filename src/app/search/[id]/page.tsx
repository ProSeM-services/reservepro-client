import { SearchCompanyDetail } from "@/layers/search/page/compnay-id/page";
import React, { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback="Loading... ">
      <SearchCompanyDetail params={params} />
    </Suspense>
  );
}
