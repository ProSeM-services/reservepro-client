import { PackageCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="size-full  flex flex-col justify-center items-center text-card-foreground">
      <PackageCheck className="size-20" />
      <p>Selecciona un servicio para ver sus detalles</p>
    </div>
  );
}
