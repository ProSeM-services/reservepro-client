import { Suspense } from "react";
import { HomePage } from "@/layers/home/page";
interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    city?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense>
      <HomePage searchParams={searchParams} />
    </Suspense>
  );
}
