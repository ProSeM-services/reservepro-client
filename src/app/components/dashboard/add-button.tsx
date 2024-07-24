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
import MemberForm from "@/app/dashboard/crate-member-form";
import CompanyForm from "@/app/dashboard/create-company-form";
export type ICreateType = "member" | "company";
interface AddButtonProps {
  type: ICreateType;
}
const config: Record<ICreateType, { title: string; Content: () => ReactNode }> =
  {
    member: {
      title: "Agregar un miembro al equipo",
      Content: MemberForm,
    },
    company: {
      title: "Crear una sucursal nueva",
      Content: CompanyForm,
    },
  };
export default function AddButton({ type }: AddButtonProps) {
  const { title, Content } = config[type];
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-primary p-2 rounded-md">
          <PlusIcon className="size-4 text-white" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            <Content />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
