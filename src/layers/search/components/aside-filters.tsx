"use client";

import { CATEGORY_VALUES } from "@/interfaces/categeory.interface";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check, FilterIcon, FilterX } from "lucide-react";
import LocationFilter from "./location-filter";
import CategoryFilter from "./category-filter";
import { Label } from "@/components/ui/label";
export default function AsideFilters() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [categoryFilter, setCategoryFilter] = useState<string>(
    params.get("category") || ""
  );

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelectfilter = (category: string) => {
    params.set("page", "1");
    if (categoryFilter === category) {
      setCategoryFilter("");
      params.delete("category");
    } else {
      setCategoryFilter(category);
      params.set("category", category);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"}>
          <FilterIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" space-y-4 ">
        <SheetTitle className="flex items-center gap-1 ">
          <FilterX className="size-4" /> Filtros
        </SheetTitle>
        <hr />
        <div className="relative  h-full">
          <aside className="w-full space-y-4">
            <Label className="text-lg text-gray-600">Categorias</Label>
            <div className="  grid grid-cols-3 gap-2">
              {CATEGORY_VALUES.map((cat) => (
                <Badge
                  key={cat}
                  variant={
                    params.get("category") === cat ? "default" : "outline"
                  }
                  className="cursor-pointer h-10"
                  onClick={() => handleSelectfilter(cat)}
                >
                  <div className="flex items-center gap-2">
                    {params.get("category") === cat && (
                      <Check className="size-3" />
                    )}
                    {cat}
                  </div>
                </Badge>
              ))}
            </div>
          </aside>
          <section className="absolute w-full flex justify-end bottom-0 pb-5">
            <SheetTrigger>
              <Button>Aplicar</Button>
            </SheetTrigger>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
