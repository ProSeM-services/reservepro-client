import { getMemberById } from "@/lib/actions";
import { UserIcon } from "lucide-react";
import React from "react";

export default async function MemberInfo({ memberId }: { memberId: string }) {
  const member = await getMemberById(memberId);
  return (
    <div className="flex  items-center  font-semibold">
      <UserIcon />
      {member.name}, {member.lastName}
    </div>
  );
}
