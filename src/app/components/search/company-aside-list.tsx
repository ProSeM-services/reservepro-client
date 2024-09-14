import { getClientComapnies } from "@/lib/clienta-actions";
import React from "react";
import CompanyCard from "./company-card";

export default async function CompnayList({
  query,
  category,
  city,
}: {
  query: string;
  category: string;
  city: string;
  currentPage: number;
}) {
  const allComapnies = await getClientComapnies({
    category,
    city,
    query,
  });
  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {allComapnies.map((comp) => (
        <CompanyCard company={comp} key={comp.id} size="sm" />
      ))}
    </div>
  );
}
