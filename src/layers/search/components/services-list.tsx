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
    <div className="space-y-4 w-full h-full">
      {services.length ? (
        services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between border border-border rounded-lg p-4 cursor-pointer "
          >
            <div className="space-y-2">
              <strong>{service.title}</strong>
              <p className="text-gray-400">
                {formatDuration(service.duration)}
              </p>
              <p>$ {service.price}</p>
            </div>
            {!readonly && <SelectService service={service} />}
          </div>
        ))
      ) : (
        <div className="bg-muted p-6 h-full rounded-lg flex flex-col justify-center items-center gap-2 text-gray-800 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            />
          </svg>

          <p className="font-semibold">No data</p>
        </div>
      )}
    </div>
  );
}
