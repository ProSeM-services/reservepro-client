import React from "react";
import { MemberCard } from "./card";
import { getMembers } from "@/lib/actions";
import { Users2Icon } from "lucide-react";

export default async function MemberList() {
  const members = await getMembers();

  return (
    <div className=" max-h-[30vh]  overflow-y-auto ">
      {members?.length === 0 ? (
        <div className="bg-accent    h-52 w-80 rounded-md flex flex-col items-center justify-center text-center   ">
          <Users2Icon className="size-10" />
          No tenes miembros cargados en tu equipo
        </div>
      ) : (
        <div className="space-y-2">
          {members?.map((member) => (
            <MemberCard member={member} key={member._id} />
          ))}
        </div>
      )}
    </div>
  );
}
