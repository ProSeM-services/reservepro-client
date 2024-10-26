import { CustomerIdPage } from "@/layers/customers/page";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback="Loading ...">
      <CustomerIdPage params={params} />
    </Suspense>
  );
}
