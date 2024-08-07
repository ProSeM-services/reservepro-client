import React, { PropsWithChildren, ReactNode } from "react";
import CompnayList from "@/app/components/search/company-aside-list";
interface PageProps {
  children: ReactNode;
}
export default function Page({ children }: PageProps) {
  return (
    <section className="flex max-lg:flex-col gap-2  h-screen  p-6">
      <div className="w-1/5 overflow-auto  max-h-full space-y-4">
        <CompnayList category="" city="" currentPage={1} query="" />
      </div>
      <div className="flex flex-col gap-3 flex-grow overflow-auto  max-h-full   bg-background rounded-md p-6 border border-border">
        {children}
      </div>
    </section>
  );
}
