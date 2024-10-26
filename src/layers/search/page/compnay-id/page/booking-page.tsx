import SercvicesList from "@/layers/search/components/services-list";
import React from "react";

export function BookingPage({ params }: { params: { id: string } }) {
  const companyId = params.id;
  return (
    <section className=" w-full h-full  ">
      <SercvicesList companyId={companyId} readonly={false} />
    </section>
  );
}
