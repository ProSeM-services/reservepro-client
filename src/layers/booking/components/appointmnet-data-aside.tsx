import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SelectedCompanyDetail } from "./selected-company";
import { SelectedServiceDetails } from "./selected-service";
import { SelectedMember } from "./selected-member";
import { SelectedDate } from "./selected-date";
import { SelectedHour } from "./selected-hour";
import { SetAppointment } from "./set-appointment";
import { AppointmentDataTrigger } from "./appointment-data-trigger";

export function AppointmentDataAside() {
  return (
    <Sheet>
      <SheetTrigger>
        <AppointmentDataTrigger />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Información del turno</SheetTitle>
        <br />
        <aside className="  h-[92%] flex flex-col justify-between ">
          <div className=" space-y-4">
            <SelectedCompanyDetail />
            <hr />
            <SelectedServiceDetails />
            <SelectedMember />
            <SelectedDate />
            <SelectedHour />
          </div>
          <SheetTrigger>
            <SetAppointment />
          </SheetTrigger>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
