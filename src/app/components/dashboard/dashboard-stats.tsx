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
    <div className="flex flex-col gap-4 justify-center items-center    p-4 w-full  relative ">
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-5xl">{count}</p>
        <p className="font-light uppercase text-sm">
          {type === "company" ? "Sucursales" : "Miembros"}
        </p>
      </div>

      <div className="absolute top-0 right-0">
        <AddButton type={type} />
      </div>
    </div>
  );
}
