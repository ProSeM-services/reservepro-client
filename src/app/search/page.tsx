import React, { Suspense } from "react";
import Search from "../components/search/search";
import SearchTable from "../components/search/table";
import Filter from "../components/search/filter";
import LocationFilter from "../components/search/location-filter";
interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    city?: string;
  };
}
export default function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const city = searchParams?.city || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className=" flex flex-col  items-center h-screen w-[100vw] ">
      <div className="lg:max-h-[80vh] flex flex-col gap-4 bg-accent w-full items-center ">
        <div className="h-20  rounded-md flex items-center justify-center">
          <p className="text-2xl font-semibold">¿Qué estas buscando?</p>
        </div>
        <div className="w-1/2">
          <LocationFilter />
        </div>
      </div>
      <section className="  w-[90vw] max-lg:w-full p-4 h-full">
        <div className="flex-grow px-4 flex flex-col gap-4 h-full w-full max-w-full ">
          <Search placeholder="Buscar" />
          <div className="space-y-2 ">
            <span className="font-medium text-sm text-gray-500 ">
              Categorias
            </span>

            <Filter />
          </div>
          <div className="p-6 bg-accent flex-grow rounded-md max-h-[90%] h-[90%] lg:max-w-full w-full   ">
            <Suspense>
              <SearchTable
                city={city}
                query={query}
                currentPage={currentPage}
                category={category}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
