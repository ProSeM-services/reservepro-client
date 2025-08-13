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
    <section className="min-h-screen  py-6   z-10">
      <div className="container space-y-[2rem]">
        <section className="w-5/6 md:w-full  mx-auto space-y-4">
          <h3 className="font-bold text-2xl ">Negocios registrados</h3>
          <Suspense fallback={"Loading"}>
            <SearchTable
              city={""}
              query={""}
              currentPage={currentPage}
              category={""}
            />
          </Suspense>
        </section>
        {/* <section className="w-5/6 md:w-full  mx-auto space-y-4">
          <h3 className="font-bold text-2xl ">Barberías</h3>

          <Suspense fallback={"Loading"}>
            <SearchTable
              city={city}
              query={query}
              currentPage={currentPage}
              category={CategoryEnum.Barberia}
            />
          </Suspense>
        </section>
        <section className="w-5/6 md:w-full  mx-auto space-y-4">
          <h3 className="font-bold text-2xl ">Nuevos en Reserve Pro</h3>
          <Suspense fallback={"Loading"}>
            <SearchTable
              city={city}
              query={query}
              currentPage={currentPage}
              category={category}
            />
          </Suspense>
        </section> */}
      </div>
    </section>
  );
}
