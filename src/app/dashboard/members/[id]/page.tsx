import React, { Suspense } from "react";
import { BarLoader } from "@/components/common/bar-loader";
import { UserIcon } from "lucide-react";
import { MemberDetailsPage } from "@/layers/members/components";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="relative h-full">
          <BarLoader />
          <div className=" p-10 h-full w-full flex flex-col gap-4 justify-center items-center">
            <UserIcon className="size-10" />
          </div>
        </div>
      }
    >
      <MemberDetailsPage params={params} />
    </Suspense>
  );
}
