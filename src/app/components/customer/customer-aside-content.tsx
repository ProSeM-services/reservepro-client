import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ICustomer } from "@/interfaces/customer.interface";
import React from "react";
import AppointmentList from "./appointment-list";

export default function CustomerAsideContent({
  customer,
}: {
  customer: ICustomer;
}) {
  return (
    <SheetContent>
      <SheetTitle>
        {customer.firstName}, {customer.lastName}
      </SheetTitle>
      <div className="flex-grow h-[85%] space-y-3">
        <p className=" text-gray-600 text-sm space-x-1">
          Cliente desde
          <span className="font-semibold">
            {" "}
            {new Date(customer.createdAt).toLocaleDateString()}{" "}
          </span>
        </p>
        <AppointmentList apointments={customer.apointments} />
      </div>
    </SheetContent>
  );
}
