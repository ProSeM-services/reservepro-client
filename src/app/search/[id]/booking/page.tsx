import SercvicesList from "@/app/components/search/services-list";
import React from "react";

export default function BookingPage({ params }: { params: { id: string } }) {
  const companyId = params.id;
  return (
    <div>
      <section className=" w-full  flex">
        <SercvicesList companyId={companyId} readonly={false} />
      </section>
    </div>
  );
}
