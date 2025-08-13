import { ICompany } from "@/interfaces";
import React from "react";

export function AppointmentInfo({ company }: { company: ICompany }) {
  return (
    <aside className="w-1/3 p-4 bg-white rounded-lg shadow-md h-[80vh]">
      <h2 className="text-xl font-bold mb-4">{company.name}</h2>
      <div className="space-y-2 text-gray-600">
        <p className="">{company.address.value}</p>
        <p className="">{company.email}</p>
      </div>
    </aside>
  );
}
