"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export function GoBackButton() {
  const { back } = useRouter();

  return (
    <Button variant={"ghost"} onClick={back} className="space-x-2">
      <ChevronLeftSquare className="size-4" />
      <span>volver</span>
    </Button>
  );
}
