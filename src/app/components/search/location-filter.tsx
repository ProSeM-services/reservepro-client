"use client";
import React from "react";
import { AddressInput } from "../common/address-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPinIcon, XIcon } from "lucide-react";

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
    <div className="flex flex-col items-center text-sm p-2 w-full ">
      <p>¿De dónde eres?</p>

      <div className="w-full flex items-center gap-2">
        <AddressInput handleSelect={handleAddres} onlyInput />
        {params.get("city") ? (
          <div className="flex items-center  gap-2 bg-primary rounded-md  p-2 pl-2  pr-6 text-secondary  relative ">
            <MapPinIcon className="size-4" />
            <p className="text-nowrap"> {params.get("city")?.split(",")[0]}</p>

            <button
              className="size-4 rounded-full  bg-accent/15 p-0 flex items-center justify-center opacity-90 absolute top-0 right-0"
              onClick={clearParams}
            >
              <XIcon />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
