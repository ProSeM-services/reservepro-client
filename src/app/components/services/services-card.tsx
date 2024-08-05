import { IService } from "@/interfaces";
import { ClockIcon } from "lucide-react";
import React from "react";
interface ServiceCardProps {
  service: IService;
}
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className=" p-4 rounded-sm border border-accent shadow-sm lg:flex-grow    bg-background max-lg:w-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{service.title}</p>
        <p className="text-xs bg-soft-d rounded-md px-2 py-[1px] felx items-center text-white font-medium ">
          {service.provision}
        </p>
      </div>
      <div className="flex items-center gap-1 text-soft-c font-light text-sm">
        <ClockIcon className="size-4" />
        <p> {service.duration}min</p>
      </div>

      <p className="text-gray-500 font-light">
        {service.description ? (
          service.description
        ) : (
          <i>No hay descripción del serivcio</i>
        )}
      </p>
      <p className="font-semibold">${service.price}</p>
    </div>
  );
}
