import React, { Suspense } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CustomerAsideContent from "./customer-aside-content";
import { ICustomer } from "@/interfaces/customer.interface";
export default function CustomerAside({ customer }: { customer: ICustomer }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary text-primary hover:bg-sky-100 transition-all duration-150 p-1 px-4 rounded-md flex items-center text-xs font-semibold gap-2 ">
          detalles
        </div>
      </SheetTrigger>

      <CustomerAsideContent customer={customer} />
    </Sheet>
  );
}
