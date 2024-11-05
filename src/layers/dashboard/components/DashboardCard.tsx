"use client";
import React from "react";
import { DashboardStats, List } from "./";
import { DashboardStatsSkeleton, ListSkeleton } from "./dashboard-skeletons";
import { useAppSelector } from "@/store/hooks";

export function DashboardCard({ type }: { type: "member" | "company" }) {
  const { loading: loading1 } = useAppSelector((s) => s.company);
  const { loading: loading2 } = useAppSelector((s) => s.member);

  return (
    <div
      className="flex flex-col gap-3
       w-1/2 max-lg:w-full bg-background p-2 border border-accent rounded-md  "
    >
      {(type === "company" && loading1) || (type === "member" && loading2) ? (
        <DashboardStatsSkeleton />
      ) : (
        <DashboardStats type={type} />
      )}
      {(type === "company" && loading1) || (type === "member" && loading2) ? (
        <ListSkeleton />
      ) : (
        <div className="flex-grow max-h-[30vh]">
          <List type={type} />
        </div>
      )}
    </div>
  );
}
