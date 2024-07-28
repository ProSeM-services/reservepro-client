import React from "react";
import { getMembers } from "@/lib/actions";
import { UserCircle } from "lucide-react";

export default async function AddMemberAside() {
  const members = await getMembers();
  return (
    <div className="space-y-2 h-full max-h-full overflow-auto ">
      {members?.map((member) => (
        <div
          className="flex items-center gap-2 border rounded-md border-accent p-2 cursor-pointer hover:bg-sky-100 transition-all duration-150"
          key={member._id}
        >
          <UserCircle className="size-5" />
          <div className="flex items-center gap-1 ">
            <p>{member.name}</p>
            <p>{member.lastName}</p>
          </div>

          <span className="text-accent-foreground/50 text-xs">
            {member.email}
          </span>
        </div>
      ))}
    </div>
  );
}
