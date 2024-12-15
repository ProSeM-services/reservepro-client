"use client";
import { Button } from "@/components/ui/button";
import { IService } from "@/interfaces";
import { setBookinData, setStep } from "@/store/feature/booking/bookingSlice";
import { useAppDispatch } from "@/store/hooks";
import React from "react";

export function SelectService({ service }: { service: IService }) {
  const dispatch = useAppDispatch();
  const handleSelecServices = () => {
    dispatch(setBookinData({ key: "service", value: service }));
    dispatch(setBookinData({ key: "duration", value: service.duration }));
    dispatch(setStep("forward"));
  };

  return (
    <Button variant={"outline"} onClick={handleSelecServices}>
      Reservar
    </Button>
  );
}
