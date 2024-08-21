"use client";
import { IMember } from "@/interfaces/member.iterface";
import { getClientMemberData } from "@/lib/clienta-actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SelectedMember() {
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
      <p className="text-sm font-semibold text-gray-500 p-2">
        No hay profesional seleccionado
      </p>
    );
  return (
    <div
      key={member._id}
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
