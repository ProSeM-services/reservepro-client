import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ICustomer } from "@/interfaces/customer.interface";
import AppointmentList from "./appointment-list";
import { IAppointment } from "@/interfaces/appointments.interface";

export default function CustomerAsideContent({
  customer,
  appointments,
}: {
  customer: ICustomer;
  appointments: IAppointment[];
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
        {appointments.length > 0 ? (
          <AppointmentList apointments={appointments} />
        ) : (
          "..."
        )}
      </div>
    </SheetContent>
  );
}
