import { ICompany } from "@/interfaces";
import { getS3Url } from "@/lib/s3-image";
import Image from "next/image";
import React from "react";

export default function MemberList({ company }: { company: ICompany }) {
  const members = company.Users || [];
  return (
    <div className="flex items-center gap-2 flex-wrap ">
      {members.map((member) => (
        <div
          key={member.id}
          className="  p-4  flex flex-col items-center gap-2"
        >
          <div className="relative size-24 aspect-square ">
            <Image
              src={
                member.image ? getS3Url(member.image) : "/avatars/avatar.webp"
              }
              fill
              alt={member.name}
              className="shadow-md rounded-full object-cover border border-border  transition-all duration-150 hover:scale-105"
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
