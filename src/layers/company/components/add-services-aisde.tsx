"use client";
import React, { useState } from "react";
import { addServiceToComapny } from "@/lib/actions";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import ServiceCard, {
  ServiceDetailCard,
} from "@/layers/services/components/services-card";
import { useAppSelector } from "@/store/hooks";
import { BarLoader } from "@/components/common/bar-loader";

export function AddServicesAside({ company }: { company: ICompany }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Added state for loading

  const { services } = useAppSelector((s) => s.service);

  const { toast } = useToast();
  const handleSelectService = (memberId: string) => {
    let res = [];
    if (selectedServices.includes(memberId)) {
      res = selectedServices.filter((e) => e !== memberId);
    } else {
      res = [...selectedServices, memberId];
    }

    setSelectedServices(res);
  };

  const handleAddServices = async () => {
    setLoading(true); // Set loading to true when adding services
    try {
      const allServicesToAdd = selectedServices.map((serviceId) =>
        addServiceToComapny({ companyId: company.id!, serviceId })
      );
      await Promise.all(allServicesToAdd);
      toast({
        title: "Servicios cargados!",
        description: `Los servicios fueron agregados exitosamente a ${company.name}!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${company.name}!`,
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Set loading to false after adding services
    }
  };
  if (!company.id) return null;

  const servicesToShow = services.filter((s) =>
    company.Services?.find((value) => value.id === s.id) ? false : true
  );
  return (
    <div className="space-y-2 h-full max-h-full overflow-auto  ">
      {servicesToShow.length === 0 ? (
        <p>No hay servicios para mostrar!</p>
      ) : (
        <div>
          {loading && <BarLoader />}
          {servicesToShow?.map((service) => (
            <div
              className={`flex relative items-center gap-2 border rounded-md border-accent  cursor-pointer hover:bg-secondary transition-all duration-150 ${
                selectedServices.includes(service.id!)
                  ? "border border-primary "
                  : ""
              }`}
              key={service.id}
              onClick={() => handleSelectService(service.id!)}
            >
              <div className="w-full">
                <ServiceDetailCard service={service} />
              </div>

              {selectedServices.includes(service.id!) && (
                <CheckCircleIcon className="text-primary absolute right-2 bottom-2  size-6" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-1 right-1  ">
        <Button
          onClick={handleAddServices}
          disabled={selectedServices.length === 0 || loading} // Disable button if loading
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
