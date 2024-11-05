import { AddButton } from "@/layers/dashboard/components";
import { ServicesList } from "../components";

export function ServicesPage() {
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2>Servicios</h2>
        <AddButton type="services" />
      </div>
      <hr />
      <ServicesList />
    </div>
  );
}
