"use client";
import React from "react";
import { getComapnies, getMembers } from "@/lib/actions";
import { CompanyCard, MemberCard } from "./card";
import { HousePlugIcon, LucideProps, Users2Icon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

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

export function List({ type }: { type: "member" | "company" | "service" }) {
  const { companies } = useAppSelector((s) => s.company);
  const { members } = useAppSelector((s) => s.member);
  return (
    <div className=" max-h-full h-full   overflow-y-auto ">
      {(type === "company" && companies.length === 0) ||
      (type === "member" && members.length === 0) ? (
        <EmptyList type={type} />
      ) : (
        <div className="space-y-2">
          {type === "company" &&
            companies?.map((company) => (
              <CompanyCard company={company} key={company.id} />
            ))}
          {type === "member" &&
            members?.map((member) => (
              <MemberCard member={member} key={member.id} />
            ))}
        </div>
      )}
    </div>
  );
}
