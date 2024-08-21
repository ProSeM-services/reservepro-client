"use client";

import { CATEGORY_VALUES } from "@/interfaces/categeory.interface";
import React, { useState } from "react";
import CategoryCard from "../dashboard/category-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function CategoryFilter() {
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
    <div className="  gap-4  flex flex-wrap items-center">
      {CATEGORY_VALUES.map((cat) => (
        <Badge
          key={cat}
          variant={params.get("category") === cat ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => handleSelectfilter(cat)}
        >
          {" "}
          {cat}
        </Badge>
      ))}
    </div>
  );
}
