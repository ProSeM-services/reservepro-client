import { Building } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="size-full  flex flex-col justify-center items-center text-card-foreground">
      <Building className="size-20" />
      <p>Selecciona una sucursal para ver sus detalles</p>
    </div>
  );
}
