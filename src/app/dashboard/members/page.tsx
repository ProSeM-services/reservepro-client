import { UserSquare } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="size-full  flex flex-col justify-center items-center text-card-foreground">
      <UserSquare className="size-20" />
      <p>Selecciona un miembro para ver sus detalles</p>
    </div>
  );
}
