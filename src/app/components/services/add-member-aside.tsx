"use client";
import React, { useEffect, useState } from "react";
import { addMemberToService, getMembers } from "@/lib/actions";
import { CheckCircleIcon, UserCircle } from "lucide-react";
import { IMember } from "@/interfaces/member.iterface";
import { Button } from "@/components/ui/button";
import { IService } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { BarLoader } from "../common/bar-loader";

export default function AddMembertoServiceAside({
  service,
  handleAddMembers,
}: {
  service: IService;
  handleAddMembers: (list: string[]) => Promise<any>;
}) {
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [selecetedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await getMembers();
        setMembers(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isAdding) fetchMembers();
  }, [isAdding]);
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

  const handleAddSelectedMembers = async () => {
    setIsAdding(true);
    try {
      await handleAddMembers(selecetedMembers);
      toast({
        title: "Miembros cargados!",
        description: `Los miembros fueron agregados exitosamente a ${service.title}!`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error en la carga!",
        description: `Hubo un error al agregar los miembors en ${service.title}!`,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  if (!service._id) return null;

  return (
    <div className="space-y-2 h-full max-h-full overflow-auto  ">
      {loading ? <BarLoader /> : null}
      {!loading && members && !members.length ? (
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
          onClick={handleAddSelectedMembers}
          disabled={selecetedMembers.length === 0}
          className="text-white"
          isLoading={isAdding}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}
