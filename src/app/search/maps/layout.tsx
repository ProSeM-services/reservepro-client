import HomeHeader from "@/layers/home/components/home-header";
import { ClusterMap } from "@/layers/search/page/maps/components/cluster-map";
import React, { ReactNode } from "react";
interface PageProps {
  children: ReactNode;
}
export default function Page({ children }: PageProps) {
  return (
    <section className="flex flex-col max-lg:flex-col gap-2  h-screen  ">
      <HomeHeader>
        <h1 className="text-lg font-light ">Encuentra servicios cerca de ti</h1>
      </HomeHeader>
      <div className="flex h-full p-1">
        <div className="w-1/6 overflow-auto  max-h-full space-y-5">
          {children}
        </div>
        <div className="flex flex-col gap-3 flex-grow overflow-auto  max-h-full   bg-background rounded-md p-6 border border-border">
          <ClusterMap />
        </div>
      </div>
    </section>
  );
}
