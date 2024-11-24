import React, { Suspense } from "react";
import { ClientFormAppointmentPage } from "@/layers/search/page/compnay-id/page/confirmAppointment";

export default function page() {
  return (
    <Suspense>
      <ClientFormAppointmentPage />
    </Suspense>
  );
}
