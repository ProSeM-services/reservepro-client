"use client";
import { Button } from "@/components/ui/button";
import { IService } from "@/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SelectService({ service }: { service: IService }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSelecServices = () => {
    if (service) {
      params.set("service", service.id);
      params.set("duration", service.duration.toString());
    } else {
      params.delete("service");
    }
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <Button variant={"outline"} onClick={handleSelecServices}>
      Reservar
    </Button>
  );
}
