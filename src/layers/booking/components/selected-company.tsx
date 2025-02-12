"use client";
import { ICompany } from "@/interfaces";
import { getClientCompanyData } from "@/lib/clienta-actions";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
export function SelectedCompanyDetail() {
  const params = useSearchParams();
  const [company, setCompany] = useState<ICompany | null>();
  const companyId = params.get("company") || "";

  useEffect(() => {
    if (params.get("company")) {
      getClientCompanyData(companyId).then((res) => setCompany(res));
    } else {
      setCompany(null);
    }
  }, [companyId]);

  return (
    <section className="flex gap-4">
      <div className="w-20 aspect-square bg-muted rounded-lg"></div>
      <div>
        <h2 className="font-semibold ">{company ? company.name : "-"}</h2>
        <p className="text-gray-500 text-sm">
          {company ? company.address.value : "-"}
        </p>
      </div>
    </section>
  );
}
