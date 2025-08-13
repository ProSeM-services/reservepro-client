"use client";

import { Button } from "@/components/ui/button";
import { setStep } from "@/store/feature/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChevronLeftSquare } from "lucide-react";

export function PreviousStep() {
  const { step } = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();

  return (
    <Button
      disabled={step === 0}
      variant={"ghost"}
      onClick={() => dispatch(setStep("back"))}
      className="space-x-2"
    >
      <ChevronLeftSquare className="size-4" />
      <span>volver</span>
    </Button>
  );
}
