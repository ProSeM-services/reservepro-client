import React from "react";
import { CompanyCard } from "./card";
import { getComapnies } from "@/lib/actions";
import { HouseIcon } from "lucide-react";

export default async function CompanyList() {
  const companies = await getComapnies();

  return (
    <div className="flex  gap-4">
      {companies?.length === 0 ? (
        <section className="bg-background border border-accent  rounded-md w-80 aspect-video flex flex-col items-center justify-center text-blue-500">
          <HouseIcon className="size-14 " />
          <p className="text-sm">No tenes miembros en tu equipo.</p>
        </section>
      ) : (
        <div className="flex gap-2 max-md:grid max-md:grid-cols-2  max-h-[40vh]  overflow-y-auto flex-wrap">
          {companies?.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
