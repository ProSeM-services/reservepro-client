"use client";
import React from "react";
import { AddButton } from "./add-button";
import { useAppSelector } from "@/store/hooks";

export function DashboardStats({ type }: { type: "member" | "company" }) {
  const { companies } = useAppSelector((s) => s.company);
  const { members } = useAppSelector((s) => s.member);

  const count = type === "company" ? companies.length : members.length;
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
