import { CustomerIdPage } from "@/layers/customers/page";
export default async function Page({ params }: { params: { id: string } }) {
  return <CustomerIdPage params={params} />;
}
