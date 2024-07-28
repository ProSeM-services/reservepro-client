import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import MemberForm from "@/app/components/dashboard/crate-member-form";
import CompanyForm from "@/app/components/dashboard/create-company-form";
export type ICreateType = "member" | "company";
interface AddButtonProps {
  type: ICreateType;
}
const config: Record<
  ICreateType,
  { btnText: string; title: string; Content: () => ReactNode }
> = {
  member: {
    btnText: "Agregar miembro",
    title: "Agregar un miembro al equipo",
    Content: MemberForm,
  },
  company: {
    btnText: "Agregar Sucursal",
    title: "Crear una sucursal nueva",
    Content: CompanyForm,
  },
};
export default function AddButton({ type }: AddButtonProps) {
  const { title, Content, btnText } = config[type];
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-secondary text-primary hover:bg-sky-100 transition-all duration-150 p-1 px-4 rounded-md flex items-center text-xs font-semibold gap-2 ">
          {btnText}
          <PlusIcon className="size-4 " />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-grow h-[90%]">
          <Content />
        </div>
      </SheetContent>
    </Sheet>
  );
}
