import React, { Suspense } from "react";
import { DashboardStats, List } from "./";
const DashboardStatsSkeleton = () => (
  <div className="animate-pulse  flex justify-center items-center relative">
    <div className="h-8 w-1/5 rounded-sm bg-gray-200  absolute top-1 right-1 "></div>
    <div className="size-24 rounded-full bg-gray-200  "></div>
  </div>
);

const ListSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="flex p-2 gap-1 border rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-gray-200   "></div>
      <div className="h-6 bg-gray-200  "></div>
      <div className="h-6 w-1/6 rounded-md bg-gray-200  "></div>
      <div className="h-6 flex-grow rounded-md bg-gray-200  "></div>
      <div className="size-6 rounded-full bg-gray-200   "></div>
    </div>
    <div className="flex p-2 gap-1 border rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-gray-200   "></div>
      <div className="h-6 bg-gray-200  "></div>
      <div className="h-6 w-1/6 rounded-md bg-gray-200  "></div>
      <div className="h-6 flex-grow rounded-md bg-gray-200  "></div>
      <div className="size-6 rounded-full bg-gray-200   "></div>
    </div>
    <div className="flex p-2 gap-1 border rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-gray-200   "></div>
      <div className="h-6 bg-gray-200  "></div>
      <div className="h-6 w-1/6 rounded-md bg-gray-200  "></div>
      <div className="h-6 flex-grow rounded-md bg-gray-200  "></div>
      <div className="size-6 rounded-full bg-gray-200   "></div>
    </div>
  </div>
);
export function DashboardCard({ type }: { type: "member" | "company" }) {
  return (
    <div
      className="flex flex-col gap-3
       w-1/2 max-lg:w-full bg-background p-2 border border-accent rounded-md  "
    >
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats type={type} />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <div className="flex-grow max-h-[30vh]">
          <List type={type} />
        </div>
      </Suspense>
    </div>
  );
}
