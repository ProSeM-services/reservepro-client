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
              ? " text-primary  bg-sky-100 "
              : " border-border  text-secondary-foreground "
          }   transition-all duration-300 border rounded-md p-2 flex items-center gap-2 bg-background `}
        >
          <HomeIcon />
          {company.name}
        </Link>
      ))}
    </div>
  );
}
