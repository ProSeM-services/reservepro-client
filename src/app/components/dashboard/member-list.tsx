import React from "react";
import { MemberCard } from "./card";
import { getMembers } from "@/lib/actions";
import { Users2 } from "lucide-react";

import AddButton from "./add-button";

export default async function MemberList() {
  const members = await getMembers();

  return (
    <div className="  ">
      {members?.length === 0 ? (
        <section className="bg-background border border-accent  rounded-md w-80 aspect-video flex flex-col items-center justify-center text-blue-500">
          <Users2 className="size-14 " />
          <p className="text-sm">No tenes miembros en tu equipo.</p>
        </section>
      ) : (
        <div className="flex gap-2 max-md:grid max-md:grid-cols-2  max-h-[40vh]  overflow-y-auto flex-wrap">
          {members?.map((member) => (
            <MemberCard member={member} key={member._id} />
          ))}
        </div>
      )}
    </div>
  );
}
