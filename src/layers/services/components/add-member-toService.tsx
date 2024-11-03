import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IService } from "@/interfaces";
import { PlusIcon } from "lucide-react";
import AddMembertoServiceAside from "./add-member-aside";

export default function AddMemberToService({
  service,
  handleAddMembers,
}: {
  service: IService;
  handleAddMembers: (list: string[]) => Promise<any>;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary text-primary hover:bg-sky-100 transition-all duration-150 p-1 px-4 rounded-md flex items-center text-xs font-semibold gap-2 ">
          Agregar Miembro
          <PlusIcon className="size-4 " />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          Agregar profesional al serivcio: {service.title}
        </SheetTitle>
        <div className="flex-grow h-[85%] space-y-3">
          <p className=" text-foreground/80 text-sm space-x-1">
            Los miembros de este servicio son los encargados de llevar el mismo
            adelante con los clientes.
          </p>
          <hr />
          <AddMembertoServiceAside service={service} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
