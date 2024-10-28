import React, { Suspense } from "react";
import { ConfirmAppointmentPage } from "@/layers/search/page/compnay-id/page/confirmAppointment";

export default function page() {
  return (
    <Suspense>
      <ConfirmAppointmentPage />
    </Suspense>
  );
}
