import HomeHeader from "@/app/components/home/home-header";
import MemberList from "@/app/components/search/member-list";
import SercvicesList from "@/app/components/search/services-list";
import { Button } from "@/components/ui/button";
import { getClientCompanyData } from "@/lib/clienta-actions";
import { ClockIcon, MapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
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

      <section className="container mx-auto px-4 py-8  space-y-5">
        <div className="flex flex-col gap-0">
          <h1 className="text-3xl font-bold ">{company.name}</h1>
          <p className="text-gray-600 ">{company.address.value}</p>
        </div>
        <section className=" w-full flex gap-4 justify-around ">
          <div className="h-[500px] flex-grow rounded-xl relative">
            <Image
              alt={company.name}
              fill
              objectFit="cover"
              className="object-cover rounded-xl"
              src={"/company/1.jpeg"}
            />
          </div>

          <div className="flex gap-2 flex-col w-1/4">
            <div className="h-[250px] w-full rounded-xl relative">
              <Image
                alt={company.name}
                fill
                objectFit="cover"
                className="object-cover rounded-xl"
                src={"/company/1.jpeg"}
              />
            </div>
            <div className="h-[250px] w-full rounded-xl relative">
              <Image
                alt={company.name}
                fill
                objectFit="cover"
                className="object-cover rounded-xl"
                src={"/company/1.jpeg"}
              />
            </div>
          </div>
        </section>
        <div className=" flex items-start justify-between gap-4">
          <div className="flex-grow  space-y-4">
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
            {company.email && (
              <p className="mb-4">
                <strong>Email:</strong> {company.email}
              </p>
            )}
            {company.workhours && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Horarios de atención
                </h2>
                <ul>
                  {company.workhours.map((wh, index) => (
                    <li key={index}>
                      <div className="flex justify-between gap-2 items-center w-1/2">
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
            {company.services && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
                <Suspense fallback="Loading....">
                  <SercvicesList companyId={company._id} />
                </Suspense>
              </div>
            )}
            {company.members && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Nuestro equipo</h2>
                <Suspense fallback="Loading....">
                  <MemberList companyId={company._id} />
                </Suspense>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col gap-4 w-1/3  border rounded-lg ">
            <h3 className="text-5xl font-bold">{company.name}</h3>
            <p className="text-gray-600 ">{company.address.value}</p>

            <Link
              href={`/search/${company._id}/booking`}
              className="bg-primary text-white text-center p-2 rounded-md font-semibold"
            >
              Reservar ahora
            </Link>
            <hr />

            <div className="flex items-center gap-2 text-sm font-light">
              <ClockIcon className="size-5" />
              <p>
                <span className="text-primary font-medium">Abierto</span> hasta
                las{" "}
                {company.workhours && company.workhours[1]
                  ? company.workhours[1].segments[1].endTime
                  : "XX:XX "}{" "}
                hs
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
