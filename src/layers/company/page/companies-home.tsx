import SearchTable from "@/layers/search/components/table";
import React, { Suspense } from "react";
interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    city?: string;
  };
}

export function CompaniesHomeSection({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const city = searchParams?.city || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="minh-h-screen text-card-foreground py-6">
      <div className="container space-y-[2rem]">
        <section className="w-5/6 md:w-full  mx-auto space-y-4">
          <h3 className="font-bold text-2xl ">Recomendado</h3>
          <Suspense fallback={"Loading"}>
            <SearchTable
              city={city}
              query={query}
              currentPage={currentPage}
              category={category}
            />
          </Suspense>
        </section>
        <section className="w-5/6 md:w-full  mx-auto space-y-4">
          <h3 className="font-bold text-2xl ">Nuevo en Reserve Pro</h3>

          <Suspense fallback={"Loading"}>
            <SearchTable
              city={city}
              query={query}
              currentPage={currentPage}
              category={category}
            />
          </Suspense>
        </section>
        <section className="w-5/6 md:w-full  mx-auto space-y-4">
          <h3 className="font-bold text-2xl ">Tendencia</h3>

          <Suspense fallback={"Loading"}>
            <SearchTable
              city={city}
              query={query}
              currentPage={currentPage}
              category={category}
            />
          </Suspense>
        </section>
      </div>
    </section>
  );
}
