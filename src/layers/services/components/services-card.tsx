"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ICompany, IService } from "@/interfaces";
import { removeServiceFromComapny } from "@/lib/actions";
import { ClockIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import ServiceAsideDetails from "./service-aside-details";
interface ServiceCardProps {
  service: IService;
  readonly?: boolean;
  selectedCompany?: ICompany;
  selectable?: boolean;
}

export const ServiceDetailCard = ({
  service,
  selectable = false,
}: ServiceCardProps) => {
  return (
    <div
      className={`flex flex-col items-start justify-between w-full  gap-1  p-4 rounded-sm border border-accent shadow-sm lg:flex-grow    bg-background max-lg:w-full transition-all duration-200 ${
        selectable ? "hover:border-black " : ""
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center justify-between  w-full">
            <p className="font-semibold">{service.title}</p>

            <div className="flex gap-2">
              <div className="text-xs text-soft-d rounded-md px-2 py-[1px]  items-center border font-medium flex gap-1">
                <ClockIcon className="size-4" />
                <p> {service.duration}min</p>
              </div>
              <p className="text-xs text-soft-d rounded-md px-2 py-[1px] flex items-center border font-medium ">
                {service.provision}
              </p>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default function ServiceCard({
  service,
  selectedCompany,
}: ServiceCardProps) {
  // selectedCompany prop is used for company detail page to delete this service from this selected Company.

  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const handleDeleteService = async () => {
    setDeleting(true);
    try {
      if (selectedCompany) {
        await removeServiceFromComapny({
          companyId: selectedCompany.id,
          serviceId: service.id,
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
    <div className="w-full relative">
      <Sheet>
        <SheetTrigger className="w-full">
          <ServiceDetailCard service={service} selectable />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Detalles del servicio</SheetTitle>
          <hr />
          <div className="flex-grow h-[85%] space-y-3">
            <ServiceAsideDetails serviceId={service.id} />
          </div>
        </SheetContent>
      </Sheet>
      {selectedCompany && (
        <Button
          className="absolute right-1 bottom-1 size-8"
          variant="destructive"
          isLoading={deleting}
          size={"icon"}
          onClick={handleDeleteService}
        >
          <TrashIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}
