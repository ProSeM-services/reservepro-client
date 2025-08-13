import { ICompany, IService } from "@/interfaces";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { EditServiceForm } from "./form";

export function EditService({ serivce }: { serivce: IService }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} className="flex items-center gap-2">
          <span> Editar</span>
          <PenIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="flex items-center gap-1 ">
          <PenIcon className="size-4" /> <span>{serivce.title}</span>
        </SheetTitle>
        <EditServiceForm service={serivce} />
      </SheetContent>
    </Sheet>
  );
}
