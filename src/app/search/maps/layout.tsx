import React, { PropsWithChildren, ReactNode } from "react";
import CompnayList from "@/app/components/search/company-aside-list";
interface PageProps {
  children: ReactNode;
}
export default function Page({ children }: PageProps) {
  return (
    <section className="flex flex-col max-lg:flex-col gap-2  h-screen  ">
      <header className=" mx-auto flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-primary">
            <span className="text-gray-800">Reserve</span> Pro
          </div>
        </div>
        <div>
          <h1 className="text-lg font-light ">
            Encuentra servicios cerca de ti
          </h1>
        </div>
      </header>
      <div className="flex h-full p-1">
        <div className="w-1/6 overflow-auto  max-h-full space-y-5">
          <CompnayList category="" city="" currentPage={1} query="" />
        </div>
        <div className="flex flex-col gap-3 flex-grow overflow-auto  max-h-full   bg-background rounded-md p-6 border border-border">
          {children}
        </div>
      </div>
    </section>
  );
}
