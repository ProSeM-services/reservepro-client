import { IMember } from "@/interfaces/member.iterface";
import { UserCircle2 } from "lucide-react";

export function ProfesionalCell({ user }: { user: IMember }) {
  return (
    <div className=" flex justify-between items-center p-2 rounded-sm border border-accent shadow-sm w-full  text-sm">
      <div className="flex items-center gap-4  max-md:flex-grow  w-3/4  max-md:justify-between ">
        <div className="flex items-center gap-2">
          <UserCircle2 className="h-5 w-5 text-primary" />
          <span className="  font-medium text-nowrap">
            {user.name}, {user.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}
