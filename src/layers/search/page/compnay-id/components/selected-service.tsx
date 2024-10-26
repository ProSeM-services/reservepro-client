"use client";

import { IService } from "@/interfaces";
import {
  getClientServiceData,
  getServicesMembers,
} from "@/lib/clienta-actions";
import { formatDuration } from "@/lib/formatDuration";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export function SelectedServiceDetails() {
  const params = useSearchParams();

  const [service, setService] = useState<IService | null>();

  const serviceId = params.get("service") || "";
  useEffect(() => {
    if (params.get("service")) {
      getClientServiceData(params.get("service") || "").then((res) =>
        setService(res)
      );
    } else {
      setService(null);
    }
  }, [serviceId]);

  if (!service)
    return (
      <div className="space-y-1 p-2 text-gray-600 text-sm">
        <div className=" flex justify-between font-semibold">
          <p> -</p>
          <p>$ -</p>
        </div>
        <p className="text-gray-400">{formatDuration(0)}</p>
      </div>
    );
  return (
    <div className="space-y-1 p-2 text-gray-600 text-sm">
      <div className=" flex justify-between font-semibold">
        <p>{service.title}</p>
        <p>$ {service.price}</p>
      </div>
      <p className="text-gray-400">{formatDuration(service.duration)}</p>
    </div>
  );
}
