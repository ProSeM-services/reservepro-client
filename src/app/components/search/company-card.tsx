"use client";
import { ICompany } from "@/interfaces";
import { HomeIcon, MailIcon, MapPinned } from "lucide-react";
import React from "react";
import CategoryCard from "../dashboard/category-card";
import { useRouter } from "next/navigation";

export default function CompanyCard({
  company,
  size = "md",
}: {
  company: ICompany;
  size?: "sm" | "md";
}) {
  const router = useRouter();
  const selectCompany = (id: string) => {
    router.push(`/search/company/${id}`);
  };
  return (
    <div
      className={` flex flex-col justify-center items-center gap-3 p-4 rounded-sm border border-accent shadow-sm lg:flex-grow  cursor-pointer hover:bg-soft-c/25 transition-all duration-200  ${
        size === "md" ? "h-40" : ""
      } bg-background max-lg:w-full `}
      key={company._id}
      onClick={() => selectCompany(company._id)}
    >
      <section className="flex w-full flex-col text-[14px]">
        <div className="flex items-center gap-2  font-bold ">
          <HomeIcon className=" size-4" />
          <span className=" ">{company.name}</span>
        </div>
        <div className="flex items-center gap-2 w-full  ">
          <MapPinned className="size-4 " />
          <p
            className={`
              truncate   max-w-[90%] max-lg:w-56 text-left`}
          >
            {company.address.value}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full   ">
          <MailIcon className="size-4" />
          <p
            className={`
              truncate   max-w-[90%] max-lg:w-56 text-left`}
          >
            {company.email}
          </p>
        </div>
        {size === "md" ? (
          <div className="flex items-center gap-2 w-full max-w-full overflow-y-auto my-2 text-[11px]  ">
            {company.category.map((category) => (
              <CategoryCard
                category={category}
                selected={false}
                key={category}
              />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
