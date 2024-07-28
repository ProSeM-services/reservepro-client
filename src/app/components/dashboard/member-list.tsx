import React from "react";
import { MemberCard } from "./card";
import { getMembers } from "@/lib/actions";
import { Users2Icon } from "lucide-react";

export default async function MemberList() {
  const members = await getMembers();

  return (
    <div className="flex gap-2 flex-wrap max-h-[40vh]  overflow-y-auto ">
      {members?.length === 0 ? (
        <div className="bg-accent    h-52 w-80 rounded-md flex flex-col items-center justify-center text-center   ">
          <Users2Icon className="size-10" />
          No tenes miembros cargados en tu equipo
        </div>
      ) : (
        members?.map((member) => (
          <MemberCard member={member} key={member._id} />
        ))
      )}
    </div>
  );
}
