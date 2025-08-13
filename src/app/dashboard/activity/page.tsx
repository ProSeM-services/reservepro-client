import { ActivityPage } from "@/layers/activity/page";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback="Loading ...">
      <ActivityPage />
    </Suspense>
  );
}
