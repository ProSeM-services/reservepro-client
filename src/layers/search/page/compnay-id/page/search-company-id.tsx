import HomeHeader from "@/layers/home/components/home-header";
import MemberList from "@/layers/search/components/member-list";
import SercvicesList from "@/layers/search/components/services-list";
import { getClientCompanyData } from "@/lib/clienta-actions";
import { ClockIcon, MapIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { CompanyImages } from "../components/company-images";

export async function SearchCompanyDetail({
  params,
}: {
  params: { id: string };
}) {
  const company = await getClientCompanyData(params.id);

  return (
    <div className=" ">
      <HomeHeader>
        <Link
          href={"/"}
          className="border py-1 px-3 rounded-xl hover:bg-muted transition-all duration-150"
        >
          Volver
        </Link>
      </HomeHeader>

      <section className="container mx-auto px-4 py-8  space-y-5 ">
        <div className="flex flex-col gap-0 ">
          <h1 className="text-3xl font-bold ">{company.name}</h1>
          <p className="text-gray-600 ">{company.address.value}</p>
          <p className="text-gray-600 ">{company.email}</p>
        </div>
        {company.images?.length ? <CompanyImages company={company} /> : null}
        <div className=" flex  max-md:flex-col-reverse items-start justify-between gap-4 ">
          <div className="flex-grow  max-md:w-full space-y-4">
            <h1 className="text-2xl font-bold ">Nosotros</h1>
            <div className="mb-4">
              {company.category.map((cat) => (
                <span
                  key={cat}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {cat}
                </span>
              ))}
            </div>

            {company.workhours && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Horarios de atención
                </h2>
                <ul>
                  {company.workhours
                    .filter((item) => item.segments.length > 0)
                    .map((wh, index) => (
                      <li key={index}>
                        <div className="flex  justify-between gap-2 items-center w-1/2 max-md:w-full">
                          <p className="font-semibold">
                            {
                              ["dom", "lun", "mar", "mie", "jue", "vie", "sab"][
                                wh.day
                              ]
                            }
                          </p>

                          <div className="flex gap-2">
                            {wh.segments.map(({ endTime, startime }) => (
                              <span className="" key={endTime}>
                                {startime} - {endTime}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {company.Services && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
                <Suspense fallback="Loading....">
                  <SercvicesList companyId={company.id} />
                </Suspense>
              </div>
            )}
            {company.Users && (
              <div className="mt-8 ">
                <h2 className="text-2xl font-semibold mb-4">Nuestro equipo</h2>
                <Suspense fallback="Loading....">
                  <MemberList company={company} />
                </Suspense>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col gap-4 md:w-1/3  w-full border rounded-lg ">
            <h3 className="text-5xl font-bold max-md:hidden">{company.name}</h3>
            <p className="text-gray-600  max-md:hidden">
              {company.address.value}
            </p>

            <Link
              // href={`/search/${company.id}/booking?company=${company.id}`}
              href={`/booking?company=${company.id}`}
              className="bg-primary text-white text-center p-2 rounded-md font-semibold"
            >
              Reservar ahora
            </Link>
            <hr />

            <div className="flex items-center gap-2 text-sm font-light">
              <ClockIcon className="size-5" />
              <p>
                <span className="text-primary font-medium">Abierto</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-light">
              <MapIcon className="size-5" />
              <p>{company.address.value}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
