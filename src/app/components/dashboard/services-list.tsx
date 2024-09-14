import { getServices } from "@/lib/actions";
import React from "react";
import ServiceCard from "../services/services-card";
import { EmptyList } from "./dashboard-list";

export default async function ServicesList() {
  const services = await getServices();

  return (
    <div className="  h-full  ">
      {services.length === 0 ? (
        <div className="h-full">
          <EmptyList type="service" />
        </div>
      ) : (
        <div className="  grid grid-cols-3 gap-2 max-lg:grid-cols-2   ">
          {services.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      )}
    </div>
  );
}
