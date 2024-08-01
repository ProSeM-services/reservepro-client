"use client";

import { CATEGORY_VALUES } from "@/interfaces/categeory.interface";
import React, { useState } from "react";
import CategoryCard from "../dashboard/category-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filter() {
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
    <>
      <div className=" flex  gap-4 max-w-full  overflow-x-auto overflow-y-hidden  max-lg:hidden">
        {CATEGORY_VALUES.map((cat) => (
          <div
            key={cat}
            onClick={() => handleSelectfilter(cat)}
            className="w-[95%]"
          >
            <CategoryCard category={cat} selected={categoryFilter === cat} />
          </div>
        ))}
      </div>
      <div className="lg:hidden">
        <Select onValueChange={(value) => handleSelectfilter(value)}>
          <SelectTrigger className=" h-15">
            <SelectValue placeholder="Selecionar catgoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{"Categorias"}</SelectLabel>
              {CATEGORY_VALUES.map((cat) => (
                <SelectItem value={cat} key={cat}>
                  <div>
                    <CategoryCard
                      category={cat}
                      selected={categoryFilter === cat}
                    />
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
