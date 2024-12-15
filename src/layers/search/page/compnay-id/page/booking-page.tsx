import SercvicesList from "@/layers/search/components/services-list";
import React from "react";

export function BookingPage() {
  return (
    <section className=" w-full h-full  ">
      <SercvicesList readonly={false} />
    </section>
  );
}
