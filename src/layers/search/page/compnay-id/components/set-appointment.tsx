"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function SetAppointment() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const ableToSet =
    params.get("member") !== "" &&
    params.get("time") !== "" &&
    params.get("service") !== "";

  const handleSetTurno = async () => {};
  return (
    <div className="">
      <Button
        className="w-full"
        disabled={!ableToSet}
        onClick={handleSetTurno}
        isLoading={loading}
      >
        Agendar turno
      </Button>
    </div>
  );
}
