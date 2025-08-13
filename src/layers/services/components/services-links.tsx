"use client";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ServiceCard, { ServiceDetailCard } from "./services-card";

export function ServicesLinks() {
  const pathname = usePathname();
  const { services, loading } = useAppSelector((s) => s.service);

  return (
    <LoaderWrapper loading={loading} type="services">
      <div className="flex md:flex-col gap-4 max-md:flex-wrap ">
        {services.map((service) => (
          <Link
            href={`/dashboard/services/${service.id}`}
            key={service.id}
            className={` ${
              pathname === `/dashboard/services/${service.id}`
                ? " text-primary   "
                : " border-border  text-secondary-foreground "
            }   transition-all duration-300 border rounded-md  flex items-center gap-2 bg-background `}
          >
            <ServiceDetailCard service={service} />
          </Link>
        ))}
      </div>
    </LoaderWrapper>
  );
}
