import React, { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddMemberAside from "./add-member-aside";
export default function AddMeber() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-primary p-2 px-4 rounded-md text-white text-sm">
          Agregar Miembros{" "}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Miembros</SheetTitle>
        <div className="flex-grow h-[90%] space-y-3">
          <p className="font-semibold text-foreground/80">
            Elegir mimebros para la sucursal
          </p>
          <hr />
          <Suspense>
            <AddMemberAside />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}
