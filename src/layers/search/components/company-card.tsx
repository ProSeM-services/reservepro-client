"use client";
import { ICompany } from "@/interfaces";
import { HomeIcon, MailIcon, MapPinned } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function CompanyCard({
  company,
  index = 0,
}: {
  company: ICompany;
  index?: number;
}) {
  const router = useRouter();
  const selectCompany = (id: string) => {
    router.push(`/search/${id}`);
  };

  return (
    <div
      className={`flex flex-col   justify-start items-center rounded-xl  shadow-sm   lg:flex-grow cursor-pointer transition-all duration-200  bg-muted  max-lg:w-full `}
      key={company.id}
      onClick={() => selectCompany(company.id)}
    >
      <div className="w-full h-52  overflow-hidden rounded-sm">
        <Image
          src={`/company/${Math.floor(Math.random() * 3) + 1}.jpeg`}
          width={400}
          height={400}
          alt={`Imagen de ${company.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      <section className="flex w-full flex-col  text-[16px]  p-4 gap-2 ">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <HomeIcon className="size-4" />
            <span>{company.name}</span>
          </div>
          <div className="flex items-center gap-2 w-full font-light">
            <MapPinned className="size-4" />
            <p className="truncate max-w-[90%] max-lg:w-56 text-left">
              {company.address.value}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {company.category.map((category) => (
            <Badge key={category} variant={"outline"} className="text-nowrap ">
              {category}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
