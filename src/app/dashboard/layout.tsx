import { SideNav } from "@/layers/dashboard/components";
import React, { PropsWithChildren } from "react";
import StoreProvider from "../components/store-provider";
import DataProvider from "../components/data-provider";
import { ThemeProvider } from "../components/theme-provider";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="ligth"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex min-h-screen w-full flex-col ">
          <SideNav />

          <div className="flex flex-col sm:gap-4 sm:py-2 sm:pl-14  h-screen bg-background overflow-hidden ">
            <main className="  p-1 px-6 h-full  max-md:p-1 ">
              <DataProvider>
                <div className=" h-full max-h-full max-md:max-h-[92%]   overflow-auto rounded-md ">
                  {children}
                </div>
              </DataProvider>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
}
