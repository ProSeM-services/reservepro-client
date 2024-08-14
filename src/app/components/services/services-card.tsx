"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ICompany, IService } from "@/interfaces";
import { removeServiceFromComapny } from "@/lib/actions";
import { ClockIcon, TrashIcon, UserIcon } from "lucide-react";
import React, { Suspense, useState } from "react";
import ServicesMemberList from "./services-members-list";
interface ServiceCardProps {
  service: IService;
  selectedCompany?: ICompany;
}
export default function ServiceCard({
  service,
  selectedCompany,
}: ServiceCardProps) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const handleDeleteService = async () => {
    setDeleting(true);
    try {
      if (selectedCompany) {
        await removeServiceFromComapny({
          companyId: selectedCompany._id,
          serviceId: service._id,
        });
      }

      toast({
        title: `Servicio eliminado de ${selectedCompany?.name}`,
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-1 h-44 p-4 rounded-sm border border-accent shadow-sm lg:flex-grow    bg-background max-lg:w-full relative pb- ">
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{service.title}</p>

            <p className="text-xs bg-soft-d rounded-md px-2 py-[1px] felx items-center text-white font-medium ">
              {service.provision}
            </p>
          </div>
          {selectedCompany ? (
            <Button
              variant={"destructive"}
              size={"sm"}
              className="p-0 size-6"
              onClick={handleDeleteService}
              isLoading={deleting}
            >
              <TrashIcon className="size-4" />
            </Button>
          ) : null}
        </div>
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
      <div className="flex items-center justify-between">
        <p className="font-semibold">${service.price}</p>
      </div>

      <ServicesMemberList service={service} />
    </div>
  );
}
