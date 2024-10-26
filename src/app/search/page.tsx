import { SearchPage } from "@/layers/search/page";
import React, { Suspense } from "react";

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
    <Suspense fallback={"Loading .."}>
      <SearchPage searchParams={searchParams} />
    </Suspense>
  );
}
