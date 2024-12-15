import { WorkhoursEditor } from "@/layers/dashboard/components/workhours/wh-editor";
import { getMemberById } from "@/lib/actions";
import { EditMember } from "./edit-member";
import { NeedReladMemberPage } from "./need-reload";
import Image from "next/image";
import { UserIcon } from "lucide-react";

export async function MemberDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getMemberById(params.id);
  if (!member) return null;
  return (
    <div className="p-4 overflow-auto space-y-4 ">
      <header className=" flex justify-between">
        <div className="flex gap-4">
          {member.image ? (
            <div>
              <Image
                src={member.image}
                alt={`${member.name}'s profile`}
                className="aspect-square  rounded-full object-cover"
                width={`${100}`}
                height={100}
              />
            </div>
          ) : (
            <UserIcon className="size-[100px] aspect-square " />
          )}
          <div>
            <div className="flex gap-2">
              <h2 className="text-xl font-medium">
                {member.name} {member.lastName}
              </h2>
              <NeedReladMemberPage />
            </div>

            <p className="text-gray-400">{member.email}</p>
          </div>
        </div>

        <div>
          <EditMember member={member} />
        </div>
      </header>
      <hr />
      <div className="flex-grow space-y-4">
        <div>
          <h3 className="font-medium mb-2">Company Information</h3>
          <p className="text-gray-400">Company: {member.companyName}</p>
          {member.CompanyId && (
            <p className="text-gray-400">Company ID: {member.CompanyId}</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">Contact Details</h3>
          <p className="text-gray-400">Username: {member.userName}</p>
          {member.phone && (
            <p className="text-gray-400">Phone: {member.phone}</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">Role & Access</h3>
          <p className="text-gray-400">Role: {member.role}</p>
        </div>

        <WorkhoursEditor member={member} />
      </div>
    </div>
  );
}
