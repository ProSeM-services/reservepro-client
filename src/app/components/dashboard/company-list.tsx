import React from "react";
import { getComapnies } from "@/lib/actions";
import { CompanyCard } from "./card";
import { HousePlugIcon } from "lucide-react";

export default async function CompanyList() {
  const companies = await getComapnies();

  return (
    <div className="  max-h-[30vh]  overflow-y-auto ">
      {companies.length === 0 ? (
        <div className="bg-accent     p-4 py-8 w-full rounded-md flex flex-col items-center justify-center text-center text-sm ">
          <HousePlugIcon className="size-8" />
          No tenes surucsales creadas{" "}
        </div>
      ) : (
        <div className="space-y-2">
          {companies?.map((company) => (
            <CompanyCard company={company} key={company._id} />
          ))}
        </div>
      )}
    </div>
  );
}
