"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IService } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";

export default function RemoveMemberButton({
  member,
  service,
  removeAction,
}: {
  member: IMember;
  service: IService;
  removeAction: (memberId: string) => Promise<any>;
}) {
  const [removing, setRemoving] = useState(false);
  const { toast } = useToast();

  const handleRemoveMember = async () => {
    setRemoving(true);
    try {
      await removeAction(member.id);

      toast({
        title: `Miembro removido del servicio  - ${service.title} -  exitosamente`,
      });
    } catch (error) {
      toast({
        title: `Error al borrar miembro del servicio ${service.title}`,
        variant: "destructive",
      });
    } finally {
      setRemoving(false);
    }
  };
  return (
    <Button
      className="text-destructive p-0 size-6"
      variant={"ghost"}
      onClick={handleRemoveMember}
      isLoading={removing}
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
