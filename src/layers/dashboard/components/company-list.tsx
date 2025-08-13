"use client";
import React from "react";
import { CompanyCard } from "./card";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { useAppSelector } from "@/store/hooks";

export function CompanyList() {
  const { companies, loading } = useAppSelector((s) => s.company);

  return (
    <LoaderWrapper loading={loading} type="company">
      <div className="space-y-2">
        {companies?.map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </div>
    </LoaderWrapper>
  );
}
