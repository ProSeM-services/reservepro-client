"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function SetAppointment() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();

  const ableToSet =
    params.get("member") && params.get("time") && params.get("service");
  const handleSetTurno = () => {
    if (!ableToSet) return;
    push(`${pathname}/confirm?${params.toString()}`);
  };

  if (pathname.split("/").includes("confirm")) return null;
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
