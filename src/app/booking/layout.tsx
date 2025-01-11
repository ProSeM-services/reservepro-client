import { getClientCompanyData } from "@/lib/clienta-actions";
import React, { ReactNode } from "react";
import {
  SelectedServiceDetails,
  SelectedHour,
  SelectedMember,
  SetAppointment,
  SelectedDate,
} from "@/layers/booking/components";
import HomeHeader from "@/layers/home/components/home-header";
import Link from "next/link";
import { SelectedCompanyDetail } from "@/layers/search/page/compnay-id/components/selected-company";
import StoreProvider from "../components/store-provider";
import { PreviousStep } from "@/layers/booking/components/previous-step";
import { AppointmentDataAside } from "@/layers/booking/components/appointmnet-data-aside";

interface LayoutProps {
  params: { id: string };
  children: ReactNode;
}
export default function layout({ children }: LayoutProps) {
  return (
    <StoreProvider>
      <div className=" max-md:max-h-[90vh]">
        <HomeHeader>
          <Link
            href={"/"}
            className="border py-1 px-3 rounded-xl hover:bg-muted transition-all duration-150"
          >
            Volver
          </Link>
        </HomeHeader>

        <div className="container  max-md:h-[8vh] md:py-4 flex justify-between items-center ">
          <PreviousStep />
          <aside className="md:hidden">
            <AppointmentDataAside />
          </aside>
        </div>
        <section className=" container flex justify-between h-[82vh] max-md:max-h-[82vh]  gap-4   overflow-auto ">
          <div className=" md:max-h-full   h-full  max-w-2/3 w-2/3 flex-grow">
            {children}
          </div>
          <aside className="w-1/3 p-4 max-md:hidden border rounded-lg shadow-md h-full flex flex-col justify-between">
            <div className=" space-y-4">
              <SelectedCompanyDetail />
              <hr />
              <SelectedServiceDetails />
              <SelectedMember />
              <SelectedDate />
              <SelectedHour />
            </div>
            <SetAppointment />
          </aside>
        </section>
      </div>
    </StoreProvider>
  );
}
