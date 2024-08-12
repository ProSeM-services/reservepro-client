import React from "react";
import { getComapnies, getMembers } from "@/lib/actions";
import { CompanyCard, MemberCard } from "./card";
import { HousePlugIcon, LucideProps, Users2Icon } from "lucide-react";

export function EmptyList({
  type,
}: {
  type: "members" | "company" | "service";
}) {
  const Config: Record<
    "members" | "company" | "service",
    {
      Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
      description: string;
    }
  > = {
    company: {
      description: "No tenes surucsales creadas",
      Icon: HousePlugIcon,
    },
    service: {
      description: "No tenes servicios creados",
      Icon: HousePlugIcon,
    },
    members: {
      description: "No tenes miembros cargados en tu equipo",
      Icon: Users2Icon,
    },
  };

  const { description, Icon } = Config[type];
  return (
    <div className="bg-accent  flex-grow   h-52  w-full rounded-md flex flex-col items-center justify-center text-center text-sm ">
      <Icon className="size-8" />
      {description}
    </div>
  );
}

export default async function CompanyList({
  type,
}: {
  type: "member" | "company";
}) {
  const fetchFunction = {
    member: getMembers,
    company: getComapnies,
  };
  const list = await fetchFunction[type]();
  const copmpanies = await getComapnies();
  const members = await getMembers();
  return (
    <div className=" max-h-full h-full   overflow-y-auto ">
      {list.length === 0 ? (
        <EmptyList type="company" />
      ) : (
        <div className="space-y-2">
          {type === "company" &&
            copmpanies?.map((company) => (
              <CompanyCard company={company} key={company._id} />
            ))}
          {type === "member" &&
            members?.map((member) => (
              <MemberCard member={member} key={member._id} />
            ))}
        </div>
      )}
    </div>
  );
}
