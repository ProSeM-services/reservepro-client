import { DashboardHero, SideNav } from "@/layers/dashboard/components";
import React, { PropsWithChildren } from "react";
import StoreProvider from "../components/store-provider";
import DataProvider from "../components/data-provider";
import { ThemeProvider } from "../components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="ligth"
        enableSystem
        disableTransitionOnChange
      >
        {/* <div className="flex min-h-screen w-full flex-col ">
          <SideNav />

          <div className="flex flex-col sm:gap-4 sm:py-2 sm:pl-14  h-screen bg-background overflow-hidden ">
            <main className="  p-1 px-6 h-full  max-md:p-1 ">
              <DataProvider>
                <div className=" h-full max-h-full max-md:max-h-[92%]  overflow-auto rounded-md ">
                  {children}
                </div>
              </DataProvider>
            </main>
          </div>
        </div> */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <section className="h-10">
                  <DashboardHero />
                </section>
              </div>
            </header>
            <DataProvider>
              <div className="p-4 h-full flex-1 ">{children}</div>
            </DataProvider>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
