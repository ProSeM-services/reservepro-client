import { getServicesById } from "@/lib/actions";
import React from "react";
import { BringToFront } from "lucide-react";

export default async function ServiceDetail({
  servieId,
}: {
  servieId: string;
}) {
  const service = await getServicesById(servieId);
  return (
    <div className="  flex flex-col">
      <div className="flex items-center gap-2 font-semibold">
        <BringToFront className="size-4" />
        <p> {service.title}</p>
      </div>
    </div>
  );
}
