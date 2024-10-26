"use client";
import React, { useEffect, useState } from "react";
import { addServiceToComapny, getServices } from "@/lib/actions";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICompany, IService } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import ServiceCard from "@/layers/services/components/services-card";

export function AddServicesAside({ company }: { company: ICompany }) {
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Added state for loading

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true); // Set loading to true when fetching services
      try {
        const response = await getServices();
        setServices(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching services
      }
    };

    fetchServices();
  }, [company.members]);
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
      {loading ? (
        <div>Loading...</div>
      ) : servicesToShow.length === 0 ? (
        <p>No hay servicios para mostrar!</p>
      ) : (
        servicesToShow?.map((service) => (
          <div
            className={`flex relative items-center gap-2 border rounded-md border-accent  cursor-pointer hover:bg-secondary transition-all duration-150 ${
              selectedServices.includes(service.id!)
                ? "border border-primary "
                : ""
            }`}
            key={service.id}
            onClick={() => handleSelectService(service.id!)}
          >
            <ServiceCard service={service} />

            {selectedServices.includes(service.id!) && (
              <CheckCircleIcon className="text-primary absolute right-2 bottom-2  size-6" />
            )}
          </div>
        ))
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
