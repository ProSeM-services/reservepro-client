import { companiesCount, membersCount } from "@/lib/actions";
import React from "react";
import AddButton from "./add-button";

export default async function DashboardStats({
  type,
}: {
  type: "member" | "company";
}) {
  const fetchFunction = {
    member: membersCount,
    company: companiesCount,
  };
  const count = await fetchFunction[type]();

  return (
    <div className="flex flex-col gap-4 justify-center items-center  border border-accent rounded-lg  p-4 w-48   bg-background ">
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-7xl">{count}</p>
        <p className="font-light uppercase text-sm">{type}s</p>
      </div>

      <AddButton type={type} />
    </div>
  );
}
