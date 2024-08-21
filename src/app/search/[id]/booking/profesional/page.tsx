import { getServicesMembers } from "@/lib/clienta-actions";
import React from "react";
import SelectMemberCard from "./components/select-member-card";

export default async function page({
  searchParams,
}: {
  searchParams: { service: string };
}) {
  const { service } = searchParams;
  const members = await getServicesMembers(service);
  return (
    <div className="space-y-4 ">
      {members.map((member) => (
        <SelectMemberCard member={member} key={member._id} />
      ))}
    </div>
  );
}
