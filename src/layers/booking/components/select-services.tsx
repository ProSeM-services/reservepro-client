"use client";
import { Button } from "@/components/ui/button";
import { IService } from "@/interfaces";
import { setBookinData, setStep } from "@/store/feature/booking/bookingSlice";
import { useAppDispatch } from "@/store/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function SelectService({ service }: { service: IService }) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSelecServices = () => {
    dispatch(setBookinData({ key: "serviceId", value: service.id }));
    dispatch(setBookinData({ key: "duration", value: service.duration }));
    dispatch(setStep("forward"));
  };

  return (
    <Button variant={"outline"} onClick={handleSelecServices}>
      Reservar
    </Button>
  );
}
