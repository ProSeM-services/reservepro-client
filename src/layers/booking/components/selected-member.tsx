"use client";
import { IMember } from "@/interfaces/member.iterface";
import { getClientMemberData } from "@/lib/clienta-actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export function SelectedMember() {
  const params = useSearchParams();

  const [member, setMember] = useState<IMember | null>();

  const memberId = params.get("member") || "";
  useEffect(() => {
    if (memberId) {
      getClientMemberData(memberId).then((res) => setMember(res));
    } else {
      setMember(null);
    }
  }, [memberId]);

  if (!member)
    return (
      <div className="  p-2  flex items-center gap-2 border rounded-xl select-none ">
        <div className="shadow-md rounded-full size-14 object-cover border border-border cursor-pointer transition-all duration-150 hover:scale-105" />

        <div className="flex gap-1 font-medium">
          <p>Nombre</p>
          <p>Apellido</p>
        </div>
      </div>
    );
  return (
    <div
      key={member.id}
      className="  p-2  flex items-center gap-2 border rounded-xl select-none "
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
