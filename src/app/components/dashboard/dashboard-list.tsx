import React from "react";
import { getComapnies, getMembers } from "@/lib/actions";
import { CompanyCard, MemberCard } from "./card";
import { HousePlugIcon, LucideProps, Users2Icon } from "lucide-react";

export function EmptyList({
  type,
}: {
  type: "member" | "company" | "service";
}) {
  const Config: Record<
    "member" | "company" | "service",
    {
      Icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
      title: string;
      description: string;
    }
  > = {
    company: {
      title: "Sin sucursales",
      description: "Aún no has creado ninguna sucursal",
      Icon: HousePlugIcon,
    },
    service: {
      title: "Sin servicios",
      description: "No tienes servicios creados todavía",
      Icon: HousePlugIcon,
    },
    member: {
      title: "Equipo vacío",
      description: "No hay miembros en tu equipo actualmente",
      Icon: Users2Icon,
    },
  };

  const { title, description, Icon } = Config[type];
  return (
    <div className=" flex-grow h-64 w-full rounded-lg flex flex-col items-center justify-center text-center p-6 transition-all duration-300 ">
      <Icon className="size-16 mb-4 text-primary " />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default async function CompanyList({
  type,
}: {
  type: "member" | "company" | "service";
}) {
  const fetchFunction = {
    member: getMembers,
    company: getComapnies,
    service: getComapnies,
  };
  const list = await fetchFunction[type]();
  const copmpanies = await getComapnies();
  const members = await getMembers();
  return (
    <div className=" max-h-full h-full   overflow-y-auto ">
      {list.length === 0 ? (
        <EmptyList type={type} />
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
