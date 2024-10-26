import { ServicesPage } from "@/layers/services/page";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback="Loading..">
      <ServicesPage />
    </Suspense>
  );
}
