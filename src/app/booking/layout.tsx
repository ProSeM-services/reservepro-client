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

interface LayoutProps {
  params: { id: string };
  children: ReactNode;
}
export default function layout({ children }: LayoutProps) {
  return (
    <StoreProvider>
      <div>
        <HomeHeader>
          <Link
            href={"/"}
            className="border py-1 px-3 rounded-xl hover:bg-muted transition-all duration-150"
          >
            Volver
          </Link>
        </HomeHeader>

        <div className="container py-4">
          <PreviousStep />
        </div>
        <section className=" container flex justify-between h-[80vh] gap-4 ">
          <div className=" max-h-full   max-w-2/3 w-2/3 flex-grow">
            {children}
          </div>
          <aside className="w-1/3 p-4 border rounded-lg shadow-md h-full flex flex-col justify-between">
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
