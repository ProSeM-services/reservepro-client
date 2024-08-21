"use client";
import React from "react";
import { AddressInput } from "../common/address-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPinIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleAddres = (address: string) => {
    params.set("page", "1");
    if (address) {
      params.set("city", address);
    } else {
      params.delete("city");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const clearParams = () => {
    params.delete("city");

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center">
      <AddressInput
        handleSelect={handleAddres}
        placeholder="¿De dónde eres?"
        onlyInput
      />

      {params.get("city") && (
        <Button variant={"ghost"} size={"sm"} onClick={clearParams}>
          <XIcon />
        </Button>
      )}
    </div>
  );
}
