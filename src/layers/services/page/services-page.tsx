import { AddButton } from "@/layers/dashboard/components";
import ServiceCard from "@/layers/services/components/services-card";
import { getServices } from "@/lib/actions";
import React from "react";

export async function ServicesPage() {
  const services = await getServices();
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2>Servicios</h2>
        <AddButton type="services" />
      </div>
      <hr />
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2 flex-wrap max-w-full w-full p-4">
        {services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </div>
  );
}
