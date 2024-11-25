import { getClientCompanyData } from "@/lib/clienta-actions";
import React, { ReactNode } from "react";
import {
  SelectedServiceDetails,
  SelectedHour,
  SelectedMember,
  SetAppointment,
  SelectedDate,
} from "@/layers/search/page/compnay-id/components";
import HomeHeader from "@/layers/home/components/home-header";
import Link from "next/link";
import { GoBackButton } from "@/components";

interface LayoutProps {
  params: { id: string };
  children: ReactNode;
  searchParams: { service: string };
}
export default async function layout({ children, params }: LayoutProps) {
  const company = await getClientCompanyData(params.id);

  return (
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
        <GoBackButton />
      </div>
      <section className=" container flex justify-between h-[80vh] gap-4 ">
        <div className=" max-h-full   max-w-2/3 w-2/3 flex-grow">
          {children}
        </div>
        <aside className="w-1/3 p-4 border rounded-lg shadow-md h-full flex flex-col justify-between">
          <div className=" space-y-4">
            <section className="flex gap-4">
              <div className="w-20 aspect-square bg-muted rounded-lg"></div>
              <div>
                <h2 className="font-semibold ">{company.name}</h2>
                <p className="text-gray-500 text-sm">{company.address.value}</p>
              </div>
            </section>
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
  );
}
