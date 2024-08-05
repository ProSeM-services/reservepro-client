"use client";
import React, { useEffect, useState } from "react";
import {
  addMemberToCompany,
  addServiceToComapny,
  getFreeMembers,
  getServices,
} from "@/lib/actions";
import { CheckCircleIcon, UserCircle } from "lucide-react";
import { IMember } from "@/interfaces/member.iterface";
import { Button } from "@/components/ui/button";
import { ICompany, IService } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import ServiceCard from "../services/services-card";

export default function AddServicesAside({ company }: { company: ICompany }) {
  const [services, setServices] = useState<IService[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  useEffect(() => {
    const fetchServices = async () => {
      const response = await getServices();
      setServices(response);
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
    try {
      const allServicesToAdd = selectedServices.map((serviceId) =>
        addServiceToComapny({ companyId: company._id!, serviceId })
      );
      await Promise.all(allServicesToAdd);
      toast({
        title: "Servicios cargados!",
        description: `Los servicios fueron agregados exitosamente a ${company.name}!`,
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${company.name}!`,
        variant: "destructive",
      });
    }
  };
  if (!company._id) return null;

  return (
    <div className="space-y-2 h-full max-h-full overflow-auto  ">
      {services && !services.length ? (
        <p>no hay miembros</p>
      ) : (
        services?.map((service) => (
          <div
            className={`flex relative items-center gap-2 border rounded-md border-accent  cursor-pointer hover:bg-secondary transition-all duration-150 ${
              selectedServices.includes(service._id!)
                ? "border border-sky-300 "
                : ""
            }`}
            key={service._id}
            onClick={() => handleSelectService(service._id!)}
          >
            <ServiceCard service={service} />

            {selectedServices.includes(service._id!) && (
              <CheckCircleIcon className="text-sky-300 absolute right-2 bottom-2  size-6" />
            )}
          </div>
        ))
      )}

      <div className="absolute bottom-1 right-1  ">
        <Button
          onClick={handleAddServices}
          disabled={selectedServices.length === 0}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
