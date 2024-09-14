import { getComapnies, getMembers } from "@/lib/actions";
import React from "react";
import AddButton from "./add-button";

export default async function DashboardStats({
  type,
}: {
  type: "member" | "company";
}) {
  const fetchFunction = {
    member: getMembers,
    company: getComapnies,
  };
  const res = await fetchFunction[type]();

  const count = res.length;
  return (
    <div className="flex flex-col gap-4 justify-center items-center    p-4 w-full  relative ">
      {count > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-5xl">{count}</p>
          <p className="font-light uppercase text-sm">
            {type === "company" ? "Sucursales" : "Miembros"}
          </p>
        </div>
      ) : null}

      <div className="absolute top-0 right-0">
        <AddButton type={type} />
      </div>
    </div>
  );
}
