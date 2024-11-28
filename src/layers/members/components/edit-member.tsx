import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { IMember } from "@/interfaces/member.iterface";
import { EditMemberForm } from "./form";

export function EditMember({ member }: { member: IMember }) {
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
          <PenIcon className="size-4" />{" "}
          <span>
            {member.name} {member.lastName}
          </span>
        </SheetTitle>
        <EditMemberForm member={member} />
      </SheetContent>
    </Sheet>
  );
}
