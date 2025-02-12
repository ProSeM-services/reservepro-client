"use client";
import React from "react";
import { EmptyList } from "./dashboard-list";
import ServiceCard from "@/layers/services/components/services-card";
import { useAppSelector } from "@/store/hooks";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";

export function ServicesList() {
  const { services, loading } = useAppSelector((s) => s.service);

  return (
    <LoaderWrapper loading={loading} type="services">
      <div className="  h-full  ">
        {services.length === 0 ? (
          <div className="h-full">
            <EmptyList type="service" />
          </div>
        ) : (
          <div className="  grid grid-cols-2 gap-2 max-lg:grid-cols-2  max-md:grid-cols-1  ">
            {services.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </div>
        )}
      </div>
    </LoaderWrapper>
  );
}
