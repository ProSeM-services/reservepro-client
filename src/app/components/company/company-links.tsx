"use client";
import { ICompany } from "@/interfaces";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CompanyLinks({ companies }: { companies: ICompany[] }) {
  const pathname = usePathname();
  return (
    <div className="flex md:flex-col gap-4 max-md:flex-wrap ">
      {companies.map((company) => (
        <Link
          href={`/dashboard/company/${company._id}`}
          key={company._id}
          className={` ${
            pathname === `/dashboard/company/${company._id}`
              ? "bg-background text-secondary-foreground border border-border "
              : " bg-secondary-foreground  text-secondary"
          }   transition-all duration-300  rounded-md p-2 flex items-center gap-2`}
        >
          <HomeIcon />
          {company.name}
        </Link>
      ))}
    </div>
  );
}
