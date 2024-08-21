import { getClientComapnies } from "@/lib/clienta-actions";
import CompanyCard from "./company-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default async function SearchTable({
  query,
  category,
  city,
  view = "carousel",
}: {
  query: string;
  category: string;
  city: string;
  currentPage: number;
  view?: "grid" | "carousel";
}) {
  const companies = await getClientComapnies({ query, category, city });

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <svg
          className="w-16 h-16 text-primary mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">
          No se encontraron resultados
        </h3>
        <p className="text-gray-600">
          Lo sentimos, no hay empresas que coincidan con tu búsqueda. Intenta
          con otros criterios.
        </p>
      </div>
    );
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-3 gap-2">
        {companies.map((company, index) => (
          <div className="h-80" key={company._id}>
            <CompanyCard company={company} index={index} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <Carousel className="w-full max-w-">
      <CarouselContent className="">
        {companies.map((company, index) => (
          <CarouselItem
            key={company._id}
            className=" basis-1/3 md:basis-1/2 lg:basis-1/3 "
          >
            <div className="h-80">
              <CompanyCard company={company} key={company._id} index={index} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {companies.length > 3 ? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      ) : null}
    </Carousel>
  );
}
