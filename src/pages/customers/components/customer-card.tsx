import { ICustomer } from "@/interfaces/customer.interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AppointmentList from "./appointment-list";
export default function CustomerCard({ customer }: { customer: ICustomer }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={customer.id}>
        <div className="flex items-center justify-between gap-2 w-full bg-accent p-2 rounded-md ">
          <div
            className="flex gap-2 items-center max-md:justify-between font-normal w-[90%] "
            key={customer.id}
          >
            <div className="flex max-md:flex-col gap-4 max-md:items-start">
              <p>{customer.firstName}</p>
              <p>{customer.lastName}</p>
            </div>
            <div className="flex max-md:flex-col gap-4 max-md:items-start">
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
            </div>
          </div>
          <AccordionTrigger className=""></AccordionTrigger>
        </div>

        <AccordionContent>
          <AppointmentList apointments={customer.apointments} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
