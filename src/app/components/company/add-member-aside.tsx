"use client";
import React, { useEffect, useState } from "react";
import { addMemberToCompany, getFreeMembers } from "@/lib/actions";
import { CheckCircleIcon, UserCircle } from "lucide-react";
import { IMember } from "@/interfaces/member.iterface";
import { Button } from "@/components/ui/button";
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";

export default function AddMemberAside({ company }: { company: ICompany }) {
  const [members, setMembers] = useState<IMember[]>([]);
  const [selecetedMembers, setSelectedMembers] = useState<string[]>([]);
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await getFreeMembers();
      setMembers(response);
    };

    fetchMembers();
  }, [company.members]);
  const { toast } = useToast();
  const handleSelectMember = (memberId: string) => {
    let res = [];
    if (selecetedMembers.includes(memberId)) {
      res = selecetedMembers.filter((e) => e !== memberId);
    } else {
      res = [...selecetedMembers, memberId];
    }

    setSelectedMembers(res);
  };

  const handleAddMembers = async () => {
    try {
      const allMembersToAdd = selecetedMembers.map((memberId) =>
        addMemberToCompany({ companyId: company._id!, memberId })
      );
      await Promise.all(allMembersToAdd);
      toast({
        title: "Miembros cargados!",
        description: `Los miembros fueron agregados exitosamente a ${company.name}!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${company.name}!`,
        variant: "destructive",
      });
    }
  };
  if (!company._id) return null;

  return (
    <div className="space-y-2 h-full max-h-full overflow-auto re ">
      {members && !members.length ? (
        <p>no hay miembros</p>
      ) : (
        members?.map((member) => (
          <div
            className={`flex relative items-center gap-2 border rounded-md border-accent p-2 cursor-pointer hover:bg-secondary transition-all duration-150 ${
              selecetedMembers.includes(member._id!)
                ? "border border-sky-300 "
                : ""
            }`}
            key={member._id}
            onClick={() => handleSelectMember(member._id!)}
          >
            <UserCircle className="size-5" />
            <div className="flex items-center gap-1 ">
              <p>{member.name}</p>
              <p>{member.lastName}</p>
            </div>

            <span className="text-accent-foreground/50 text-xs">
              {member.email}
            </span>

            {selecetedMembers.includes(member._id!) && (
              <CheckCircleIcon className="text-primary absolute right-2  size-4" />
            )}
          </div>
        ))
      )}

      <div className="absolute bottom-1 right-1  ">
        <Button
          onClick={handleAddMembers}
          disabled={selecetedMembers.length === 0}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
