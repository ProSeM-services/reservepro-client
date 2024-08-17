import React, { PropsWithChildren } from "react";
import SideNav from "../components/dashboard/sidenav";

import UserMenu from "../components/dashboard/user-menu";
import BreadcrumbLinks from "../components/dashboard/breadcrumb-links";
import SheetSideMenu from "../components/dashboard/sheet-sidemenu";
export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <SideNav />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14  h-screen bg-muted">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex justify-between w-full">
            <SheetSideMenu />
            <BreadcrumbLinks />

            <UserMenu />
          </div>
        </header>
        <main className="  p-1 px-6 h-full max-h-full overflow-auto ">
          <div className="bg-background h-full  rounded-md p-4 ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
