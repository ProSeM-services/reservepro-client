import CustomerTable from "@/layers/customers/components/customers-table";

export function CustomersPages() {
  return (
    <div className="overflow-hidden h-full">
      <div className="flex justify-between items-center p-2">
        <h2 className="font-bold">Clientes</h2>
      </div>
      <hr />
      <div className="flex flex-col gap-0 p-4 max-md:p-1 overflow-auto max-h-[90%]">
        <CustomerTable />
      </div>
    </div>
  );
}
