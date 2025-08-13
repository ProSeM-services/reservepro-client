"use client";
import React from "react";
import { DashboardStats, List } from "./";
import { useAppSelector } from "@/store/hooks";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";

export function DashboardCard({ type }: { type: "member" | "company" }) {
  const { loading: loading1 } = useAppSelector((s) => s.company);
  const { loading: loading2 } = useAppSelector((s) => s.member);

  return (
    <div
      className="flex flex-col gap-3
       w-1/2 max-lg:w-full bg-background p-2 border border-accent rounded-md  "
    >
      <LoaderWrapper
        loading={
          (type === "company" && loading1) || (type === "member" && loading2)
        }
        type={type === "company" ? "company" : "members"}
      >
        <DashboardStats type={type} />
        <div className="flex-grow max-h-[30vh]">
          <List type={type} />
        </div>
      </LoaderWrapper>
    </div>
  );
}
