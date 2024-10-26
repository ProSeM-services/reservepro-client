import { getClientCompanyData } from "@/lib/clienta-actions";
import React, { ReactNode } from "react";

import { BreadcrumbLinks } from "@/layers/dashboard/components";
import {
  SelectedServiceDetails,
  SelectedHour,
  SelectedMember,
  SetAppointment,
} from "@/layers/search/page/compnay-id/components";

interface LayoutProps {
  params: { id: string };
  children: ReactNode;
  searchParams: { service: string };
}
export default async function layout({ children, params }: LayoutProps) {
  const company = await getClientCompanyData(params.id);

  return (
    <div>
      <div className="container py-4">
        <BreadcrumbLinks />
      </div>
      <section className=" container flex justify-between h-[90vh] gap-4 ">
        <div className=" max-h-[90vh]  max-w-2/3 w-2/3 flex-grow">
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
            <SelectedHour />
          </div>
          <SetAppointment />
        </aside>
      </section>
    </div>
  );
}
