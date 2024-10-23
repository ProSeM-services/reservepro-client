"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { ICompany } from "@/interfaces";
import { deleteCompany } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
export default function DeleteCompany({ company }: { company: ICompany }) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCompany(company.id);

      toast({
        title: "Sucursal elimnada!",
      });
      router.push("/dashboard/company");
    } catch (error) {
      toast({
        title: `Error al elimnar surcursal ${company.name}`,
      });
    } finally {
      setDeleting(true);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-white bg-red-500  p-1 px-2 text-sm rounded-md flex items-center gap-2 font-light">
        Eliminar
        <TrashIcon className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Seguro que desea eliminar la sucursal {company.name} ?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente la
            sucursal y eliminará sus datos de nuestros servidores.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 justify-end  ">
          <Button
            size={"sm"}
            variant={"destructive"}
            isLoading={deleting}
            onClick={handleDelete}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
