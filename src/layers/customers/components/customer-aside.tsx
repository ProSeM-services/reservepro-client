"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICustomer } from "@/interfaces/customer.interface";

export default function CustomerAside({ customer }: { customer: ICustomer }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary text-primary hover:bg-sky-100 transition-all duration-150 p-1 px-4 rounded-md flex items-center text-xs font-semibold gap-2 ">
          detalles
        </div>
      </SheetTrigger>
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

          <hr />
          <b>Lsita de turnos</b>
          {/* {appointments.length > 0 ? (
            <AppointmentList apointments={appointments} />
          ) : (
            turnos
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
