import React from "react";
import { ChartComponent } from "@/layers/activity/components/Charts";
import { FileOutput, PiggyBankIcon } from "lucide-react";

export function ActivityPage() {
  return (
    <div className="flex max-md:flex-col h-full  ">
      <div className="flex flex-col md:w-[350px] max-md:w-full gap-4">
        <ChartComponent />
        <ChartComponent />
      </div>

      <div className="flex flex-col flex-grow gap-2 text-primary">
        <div className="flex flex-col justify-center items-center h-1/2 rounded-md bg-accent/35 ">
          <PiggyBankIcon size={60} />
          Listado de cobros
        </div>
        <div className="flex flex-col justify-center items-center h-1/2 rounded-md bg-accent/35">
          <FileOutput size={60} />
          Listado de gastos
        </div>
      </div>
    </div>
  );
}
