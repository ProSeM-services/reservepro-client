import { AppointmentPage } from "@/layers/appointments/page";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <AppointmentPage />
    </Suspense>
  );
}
