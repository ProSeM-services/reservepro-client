import { WorkhoursEditor } from "@/layers/dashboard/components/workhours/wh-editor";
import { getMemberById } from "@/lib/actions";

export async function MemberDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getMemberById(params.id);
  if (!member) return null;
  return (
    <div className="p-4 overflow-auto ">
      <header className="mb-6">
        <h2 className="text-xl font-medium">
          {member.name} {member.lastName}
        </h2>
        <p className="text-gray-400">{member.email}</p>
      </header>

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

        {member.image && (
          <div>
            <h3 className="font-medium mb-2">Profile Image</h3>
            <img
              src={member.image}
              alt={`${member.name}'s profile`}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
        <WorkhoursEditor member={member} />
      </div>
    </div>
  );
}
