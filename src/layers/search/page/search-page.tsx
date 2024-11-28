import { Button } from "@/components/ui/button";
import HomeHeader from "@/layers/home/components/home-header";
import CategoryFilter from "@/layers/search/components/category-filter";
import LocationFilter from "@/layers/search/components/location-filter";
import Search from "@/layers/search/components/search";
import SearchTable from "@/layers/search/components/table";
import { MapIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    city?: string;
  };
}

export function SearchPage({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const city = searchParams?.city || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="flex flex-col h-screen   bg-muted">
      <HomeHeader>
        <h1 className="text-lg font-light ">Encuentra servicios cerca de ti</h1>
      </HomeHeader>

      <main className=" h-[95%] bg-muted">
        <div className="container mx-auto px-4 py-8 h-full  ">
          <div className="flex space-x-4 mb-8 h-10 ">
            <div className="flex-grow">
              <Search placeholder="Buscar servicios, negocios o tratamientos" />
            </div>
            <Link href={"/search/maps"}>
              <Button variant={"outline"}>
                <MapIcon className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="flex space-x-8  max-h-[90%] h-[90%]  ">
            <aside className="w-1/4 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <LocationFilter />
              <CategoryFilter />
            </aside>

            <div className="w-3/4  max-h-full h-full overflow-auto  ">
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
