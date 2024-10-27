import { CustomersPages } from "@/layers/customers/page";
import React, { Suspense } from "react";

export default async function page() {
  return (
    <Suspense fallback="Loading...">
      <CustomersPages />
    </Suspense>
  );
}
