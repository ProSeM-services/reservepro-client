"use client";
import { useAppSelector } from "@/store/hooks";
import { TriangleAlert } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function NeedReladMemberPage() {
  const { updated } = useAppSelector((s) => s.member);

  if (!updated) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => location.reload()}
            className="flex justify-center rounded-full transition-all duration-100 items-center gap-2 cursor-pointer bg-sky-200 font-normal  size-8 p-0 "
          >
            <TriangleAlert className="size-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Recargar pagina</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
