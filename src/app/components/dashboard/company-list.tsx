import React from "react";
import { getComapnies } from "@/lib/actions";
import CategoryCard from "./category-card";
import { CompanyCard } from "./card";
import { HousePlugIcon } from "lucide-react";

export default async function CompanyList() {
  const companies = await getComapnies();

  return (
    <div className="  max-h-[40vh]  overflow-y-auto flex-wrap  border-gray-300   rounded-sm flex-grow flex gap-4">
      {companies.length === 0 ? (
        <div className="bg-accent    h-52 w-80 rounded-md flex flex-col items-center justify-center   ">
          <HousePlugIcon className="size-10" />
          No tenes surucsales creadas{" "}
        </div>
      ) : (
        companies?.map((company) => (
          <CompanyCard company={company} key={company._id} />
        ))
      )}
    </div>
  );
}
