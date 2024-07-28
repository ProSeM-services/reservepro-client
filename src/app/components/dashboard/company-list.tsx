import React from "react";
import { getComapnies } from "@/lib/actions";
import { CompanyCard } from "./card";
import { HousePlugIcon } from "lucide-react";

export default async function CompanyList() {
  const companies = await getComapnies();

  return (
    <div className="  max-h-[30vh]  overflow-y-auto ">
      {companies.length === 0 ? (
        <div className="bg-accent    h-52 w-80 rounded-md flex flex-col items-center justify-center   ">
          <HousePlugIcon className="size-10" />
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
