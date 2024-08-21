import React, { Suspense } from "react";
import Search from "../components/search/search";
import SearchTable from "../components/search/table";
import CategoryFilter from "../components/search/category-filter";
import LocationFilter from "../components/search/location-filter";
import HomeHeader from "../components/home/home-header";
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
    <div className="flex flex-col   bg-muted">
      <HomeHeader>
        <h1 className="text-lg font-light ">Encuentra servicios cerca de ti</h1>
      </HomeHeader>

      <main className=" h-screen">
        <div className="container mx-auto px-4 py-8 h-full ">
          <div className="flex space-x-4 mb-8">
            <div className="flex-grow">
              <Search placeholder="Buscar servicios, negocios o tratamientos" />
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Buscar
            </button>
          </div>

          <div className="flex space-x-8">
            <aside className="w-1/4 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <LocationFilter />
              <CategoryFilter />
            </aside>

            <div className="w-3/4 ">
              <Suspense fallback={<div>Cargando resultados...</div>}>
                <SearchTable
                  view="grid"
                  city={city}
                  query={query}
                  currentPage={currentPage}
                  category={category}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
