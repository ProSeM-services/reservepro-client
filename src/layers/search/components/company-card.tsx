"use client";
import { ICompany } from "@/interfaces";
import { HomeIcon, MailIcon, MapPinned, ImageIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getS3Url } from "@/lib/s3-image";

export default function CompanyCard({
  company,
  isOnMapPage = false,
}: {
  company: ICompany;
  index?: number;
  isOnMapPage?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const selectCompany = () => {
    if (isOnMapPage) {
      params.set("lat", String(company.address.lat));
      params.set("lng", String(company.address.lng));
      router.replace(`${pathname}?${params.toString()}`);
      return;
    }
    router.push(`/search/${company.id}`);
  };

  return (
    <div
      className={`flex flex-col   justify-start items-center rounded-xl  shadow-sm   lg:flex-grow cursor-pointer transition-all duration-200  bg-muted  text-gray-800  max-lg:w-full `}
      key={company.id}
      onClick={selectCompany}
    >
      <div className="w-full h-52  flex justify-center items-center overflow-hidden rounded-sm">
        {company.image ? (
          <Image
            src={getS3Url(company.image)}
            width={400}
            height={400}
            alt={`Imagen de ${company.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="size-full flex items-center justify-center">
            <ImageIcon className="size-24 text-gray-500" />
          </div>
        )}
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
