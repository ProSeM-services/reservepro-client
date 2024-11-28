"use client";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { CompanyCard } from "@/layers/dashboard/components";
import { useAppSelector } from "@/store/hooks";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function CompanyLinks() {
  const pathname = usePathname();
  const { companies, loading } = useAppSelector((s) => s.company);

  return (
    <LoaderWrapper loading={loading} type="company">
      <div className="flex md:flex-col gap-4 max-md:flex-wrap ">
        {companies.map((company) => (
          <Link
            href={`/dashboard/company/${company.id}`}
            key={company.id}
            className={` ${
              pathname === `/dashboard/company/${company.id}`
                ? " text-primary "
                : " border-border  text-secondary-foreground "
            }   transition-all duration-300 border rounded-md  flex items-center gap-2 bg-background `}
          >
            <CompanyCard company={company} readonly />
          </Link>
        ))}
      </div>
    </LoaderWrapper>
  );
}
