import AppointmentList from "@/layers/customers/components/appointment-list";
import { getAppointmentsByEmail } from "@/lib/appointments.actions";
import { getCustomerById } from "@/lib/customer.actions";
import { MailIcon, Phone, UserCircle2 } from "lucide-react";

export async function CustomerIdPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const customer = await getCustomerById(id);
  const appointments = await getAppointmentsByEmail(customer.email);
  return (
    <div className="space-y-3 bg-background rounded-md  p-2 h-full">
      <header className=" text-[14px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle2 className="size-5" />
            <p className=" font-bold text-[18px]">
              {customer.firstName}, {customer.lastName}
            </p>
          </div>

          <p className="  text-sm space-x-1">
            Cliente desde el
            <span className="font-semibold">
              {" "}
              {new Date(customer.createdAt).toLocaleDateString()}{" "}
            </span>
          </p>
        </div>

        <div className="">
          <div className="flex items-center gap-2">
            <MailIcon className="size-4" />
            <p>{customer.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4" />
            <p>{customer.phone}</p>
          </div>
        </div>
      </header>
      <hr />
      <section className="">
        <div>
          <span>Turnos agendados</span>
        </div>

        {appointments.length > 0 ? (
          <AppointmentList apointments={appointments} />
        ) : (
          "turnos"
        )}
      </section>
    </div>
  );
}
