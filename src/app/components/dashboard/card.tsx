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
    <div className="rounded-xl bg-accent p-2 shadow-sm w-60">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5 text-primary" />
          <span className="ml-2 text-sm font-medium">{company.name}</span>
        </div>
        <Button
          variant={"ghost"}
          onClick={() => router.push(`/dashboard/company/${company._id}`)}
        >
          <Edit className="size-4" />
        </Button>
      </section>
      <p
        className={`
            truncate rounded-xl bg-accent/15 px-4 py-8 text-center text-xl`}
      >
        {company.address.value}
      </p>
    </div>
  );
}

interface MemberCardProps {
  member: IMember;
}
export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="bg-accent flex gap-4 h-40 w-80 rounded-md items-center p-2 max-md:flex-col  max-md:w-full">
      <UserCircle2 className="size-24 " strokeWidth={1} />
      <div className="flex flex-col items-start gap-1 h-full  w-40 max-md:w-full ">
        <p className="text-sm ml-auto bg-yellow-400/85 text-center rounded-sm px-4">
          {member.role}
        </p>
        <p className="text-md font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full ">
          {member.name}, {member.lastName}
        </p>
        <div className=" text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {member.email}
        </div>
        <div className=" text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {member.phone}
        </div>
        <div className="">{member.userName}</div>
      </div>
    </div>
  );
}
