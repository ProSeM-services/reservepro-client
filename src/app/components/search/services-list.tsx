import { Button } from "@/components/ui/button";
import { getCompnayServices } from "@/lib/clienta-actions";
import React from "react";
import SelectService from "./select-services";
import { formatDuration } from "@/lib/formatDuration";

export default async function SercvicesList({
  companyId,
  readonly = true,
}: {
  companyId: string;
  readonly?: boolean;
}) {
  const services = await getCompnayServices(companyId);

  return (
    <div className="space-y-4 w-full">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex items-center justify-between border border-border rounded-lg p-4 cursor-pointer "
        >
          <div className="space-y-2">
            <strong>{service.title}</strong>
            <p className="text-gray-400">{formatDuration(service.duration)}</p>
            <p>$ {service.price}</p>
          </div>
          {!readonly && <SelectService service={service} />}
        </div>
      ))}
    </div>
  );
}
