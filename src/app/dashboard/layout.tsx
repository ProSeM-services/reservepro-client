import React, { PropsWithChildren } from "react";
import SideNav from "../components/dashboard/sidenav";
import { BackgroundMark } from "../components/BackgroundMark";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full relative ">
      <BackgroundMark />
      <div className="w-full flex-none md:w-64 z-0">
        <SideNav />
      </div>
      <div className="flex-grow p-6 overflow-y-auto z-0 ">{children}</div>
    </div>
  );
}
