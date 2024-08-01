import React, { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddMemberAside from "./add-member-aside";
import { PlusIcon } from "lucide-react";
import { ICompany } from "@/interfaces";
export default function AddMeber({ company }: { company: ICompany }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary text-primary hover:bg-sky-100 transition-all duration-150 p-1 px-4 rounded-md flex items-center text-xs font-semibold gap-2 ">
          Agregar Miembros
          <PlusIcon className="size-4 " />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Miembros</SheetTitle>
        <div className="flex-grow h-[90%] space-y-3">
          <p className=" text-foreground/80 text-sm">
            Elegir mimebros para la sucursal{" "}
            <span className="font-medium">{company.name} </span>
          </p>
          <hr />
          <AddMemberAside company={company} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
