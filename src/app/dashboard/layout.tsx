import {
  BreadcrumbLinks,
  SheetSideMenu,
  SideNav,
  UserMenu,
} from "@/layers/dashboard/components";
import React, { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <SideNav />

      <div className="flex flex-col sm:gap-4 sm:py-2 sm:pl-14  h-screen bg-muted max-md:overflow-hidden">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex justify-between w-full">
            <SheetSideMenu />
            <BreadcrumbLinks />
            <UserMenu />
          </div>
        </header>
        <main className="  p-1 px-6 h-full  max-md:p-1 ">
          <div className="bg-background h-full max-h-full max-md:max-h-[92%]  overflow-auto rounded-md p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
