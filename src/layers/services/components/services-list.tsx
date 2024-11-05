"use client";
import ServiceCard from "@/layers/services/components/services-card";
import { useAppSelector } from "@/store/hooks";
import React from "react";

export function ServicesList() {
  const { services } = useAppSelector((s) => s.service);
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2 flex-wrap max-w-full w-full p-4">
      {services.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </div>
  );
}
