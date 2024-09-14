import React from "react";
import { MemberCard } from "./card";
import { getMembers } from "@/lib/actions";
import { Users2Icon } from "lucide-react";

export default async function MemberList() {
  const members = await getMembers();

  return (
    <div className=" max-h-full   overflow-y-auto ">
      {members?.length === 0 ? (
        <div className="bg-accent     p-4 py-8 w-full rounded-md flex flex-col items-center justify-center text-center text-sm  ">
          <Users2Icon className="size-8" />
          No tenes miembros cargados en tu equipo
        </div>
      ) : (
        <div className="space-y-2">
          {members?.map((member) => (
            <MemberCard member={member} key={member.id} />
          ))}
        </div>
      )}
    </div>
  );
}
