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
    params.get("member") &&
    params.get("time") &&
    params.get("service") &&
    params.get("date");
  const handleSetTurno = () => {
    if (!ableToSet) return;
    push(`${pathname}/form?${params.toString()}`);
  };

  if (pathname.split("/").includes("form")) return null;
  if (pathname.split("/").includes("confirmation")) return null;

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
