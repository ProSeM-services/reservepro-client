import React, { Suspense } from "react";
import { CompanyDetailPage } from "@/layers/company/page";
import { BarLoader } from "@/components/common/bar-loader";
import { HotelIcon } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="relative h-full">
          <BarLoader />
          <div className=" p-10 h-full w-full flex flex-col gap-4 justify-center items-center">
            <HotelIcon className="size-10" />
          </div>
        </div>
      }
    >
      <CompanyDetailPage params={params} />
    </Suspense>
  );
}
