"use client";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { Edit, HomeIcon, TrashIcon, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompanyCardProps {
  company: ICompany;
}
export function CompanyCard({ company }: CompanyCardProps) {
  const router = useRouter();
  return (
    <div className=" flex justify-between items-center p-2 rounded-sm border border-accent shadow-sm w-full  text-sm">
      <div className="flex items-center gap-4  max-md:flex-grow   w-3/4 justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5 text-primary" />
          <span className="  font-medium text-nowrap">{company.name}</span>
        </div>
        <p
          className={`
              truncate rounded-sm px-2   text-gray-400 max-md:w-40  w-80 text-left`}
        >
          {company.address.value}
        </p>
      </div>
      <Button
        variant={"ghost"}
        onClick={() => router.push(`/dashboard/company/${company.id}`)}
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
      <div className="flex items-center gap-4  max-md:flex-grow  w-3/4  max-md:justify-between ">
        <div className="flex items-center gap-2">
          <UserCircle2 className="h-5 w-5 text-primary" />
          <span className="  font-medium text-nowrap">
            {member.name}, {member.lastName}
          </span>
        </div>
        <p
          className={`
            truncate rounded-sm px-2   text-gray-400 max-md:w-40  w-80 text-left`}
        >
          {member.email}
        </p>
      </div>
      <div>
        <Button
          variant={"ghost"}
          onClick={() => router.push(`/dashboard/company/${member.id}`)}
          disabled
        >
          <Edit className="size-4" />
        </Button>
      </div>
    </div>
  );
}
