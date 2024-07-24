import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      company list
      <Suspense fallback={"loading"}></Suspense>
    </div>
  );
}
