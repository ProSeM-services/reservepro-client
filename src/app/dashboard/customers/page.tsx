import CustomerTable from "@/layers/customers/components/customers-table";
import { getCustomers } from "@/lib/actions";
import React from "react";

export default async function CustomersPages() {
  const customers = await getCustomers();
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2 className="font-bold">Clientes</h2>
      </div>
      <hr />
      <div className="flex flex-col gap-0 p-4 max-md:p-1">
        <CustomerTable customers={customers} />
      </div>
    </div>
  );
}
