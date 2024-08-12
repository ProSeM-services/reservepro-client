import { ICompany } from "@/interfaces";
import { getMembersFromCompany } from "@/lib/actions";
import React from "react";
import RemoveMember from "./remove-member";
import { MemberCard } from "../dashboard/card";
import { Users2Icon } from "lucide-react";

export default async function CompnayMemberList({
  company,
}: {
  company: ICompany;
}) {
  const members = await getMembersFromCompany(company._id);
  return (
    <div>
      {members?.length ? (
        <div>
          {members.map((member) => (
            <div className="flex items-center gap-2" key={member._id}>
              <RemoveMember member={member} company={company} />
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-background border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
          <Users2Icon className="size-10" />
          <p className="font-light text-sm w-60  text-center">
            No tenes miembros cargados en este equipo.
          </p>
        </div>
      )}
    </div>
  );
}
