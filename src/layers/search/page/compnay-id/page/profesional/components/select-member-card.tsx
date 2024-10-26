"use client";
import { IMember } from "@/interfaces/member.iterface";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function SelectMemberCard({ member }: { member: IMember }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSelectMember = () => {
    if (member) {
      params.set("member", member.id);
    } else {
      params.delete("member");
    }
    push(`${pathname}/date?${params.toString()}`);
  };
  return (
    <div
      key={member.id}
      className="  p-2  flex items-center gap-2 border rounded-xl  cursor-pointer hover:bg-muted transition-all duration-200"
      onClick={handleSelectMember}
    >
      <div className="relative size-14 aspect-square ">
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
  );
}
