"use client";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { Edit, HomeIcon, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompanyCardProps {
  company: ICompany;
}
export function CompanyCard({ company }: CompanyCardProps) {
  const router = useRouter();
  return (
    <div className=" flex justify-between items-center p-2 rounded-sm border border-accent shadow-sm w-full  text-sm">
      <div className="flex items-center gap-2">
        <HomeIcon className="h-5 w-5 text-primary" />
        <span className="  font-medium">{company.name}</span>
        <p
          className={`
            truncate rounded-xl bg-accent/15  text-gray-400   w-80 text-left`}
        >
          {company.address.value}
        </p>
      </div>
      <Button
        variant={"ghost"}
        onClick={() => router.push(`/dashboard/company/${company._id}`)}
      >
        <Edit className="size-4" />
      </Button>
    </div>
  );
}

interface MemberCardProps {
  member: IMember;
}
export function MemberCard({ member }: MemberCardProps) {
  const router = useRouter();
  return (
    <div className=" flex justify-between items-center p-2 rounded-sm border border-accent shadow-sm w-full  text-sm">
      <div className="flex items-center gap-2">
        <UserCircle2 className="h-5 w-5 text-primary" />
        <span className="  font-medium">
          {member.name}, {member.lastName}
        </span>
        <p
          className={`
            truncate rounded-xl bg-accent/15  text-gray-400   w-80 text-left`}
        >
          {member.email}
        </p>
      </div>
      <Button
        variant={"ghost"}
        onClick={() => router.push(`/dashboard/company/${member._id}`)}
        disabled
      >
        <Edit className="size-4" />
      </Button>
    </div>
  );
}
