import CustomerTable from "@/layers/customers/components/customers-table";
import { getCustomers } from "@/lib/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export async function CustomersPages() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex justify-between items-center p-2">
          <h2 className="font-bold">Clientes</h2>
        </div>
        <hr />
        <div className="flex flex-col gap-0 p-4 max-md:p-1">
          <CustomerTable />
        </div>
      </HydrationBoundary>
    </div>
  );
}
