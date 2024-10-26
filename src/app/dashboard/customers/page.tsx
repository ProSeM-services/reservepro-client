import React, { Suspense } from "react";

export default async function CustomersPages() {
  return (
    <Suspense fallback="Loading...">
      <CustomersPages />
    </Suspense>
  );
}
