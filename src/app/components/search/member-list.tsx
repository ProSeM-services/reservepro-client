import { getCompanyMembers } from "@/lib/clienta-actions";
import Image from "next/image";
import React from "react";

export default async function MemberList({ companyId }: { companyId: string }) {
  const members = await getCompanyMembers(companyId);
  return (
    <div className="flex items-center gap-2">
      {members.map((member) => (
        <div
          key={member._id}
          className="  p-4  flex flex-col items-center gap-2"
        >
          <div className="relative size-24 aspect-square ">
            <Image
              src={"/avatars/avatar.webp"}
              fill
              alt={member.name}
              className="shadow-md rounded-full object-cover border border-border cursor-pointer transition-all duration-150 hover:scale-105"
            />
          </div>
          <div className="flex gap-1 font-medium">
            <p>{member.name}</p>
            <p> {member.lastName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
