import {
  BreadcrumbLinks,
  SheetSideMenu,
  SideNav,
  UserMenu,
} from "@/layers/dashboard/components";
import {
  getComapnies,
  getCustomers,
  getMembers,
  getServices,
} from "@/lib/actions";
import { getAllAppointments } from "@/lib/appointments.actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import StoreProvider from "../components/store-provider";
import DataProvider from "../components/data-provider";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });
  await queryClient.prefetchQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });
  await queryClient.prefetchQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  await queryClient.prefetchQuery({
    queryKey: ["companies"],
    queryFn: getComapnies,
  });
  await queryClient.prefetchQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
  return (
    <StoreProvider>
      <DataProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="flex min-h-screen w-full flex-col ">
            <SideNav />

            <div className="flex flex-col sm:gap-4 sm:py-2 sm:pl-14  h-screen bg-muted max-md:overflow-hidden ">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex justify-between w-full">
                  <SheetSideMenu />
                  <BreadcrumbLinks />
                  <UserMenu />
                </div>
              </header>
              <main className="  p-1 px-6 h-full  max-md:p-1 ">
                <div className="bg-background h-full max-h-full max-md:max-h-[92%]   overflow-auto rounded-md p-4">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </HydrationBoundary>
      </DataProvider>
    </StoreProvider>
  );
}
