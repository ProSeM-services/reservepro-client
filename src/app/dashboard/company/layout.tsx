import { getComapnies } from "@/lib/actions";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

export default async function Page({ children }: PropsWithChildren) {
  const allComapnies = await getComapnies();

  return (
    <section className="flex max-md:flex-col gap-2">
      <div className="flex flex-col gap-4 w-1/4 max-md:w-full">
        <p>Sucursales</p>
        <hr />

        <div className="flex md:flex-col gap-4 max-md:flex-wrap ">
          {allComapnies.map((company) => (
            <Link
              href={`/dashboard/company/${company._id}`}
              key={company._id}
              className="bg-accent hover:bg-sky-100 hover:text-primary  rounded-md p-4"
            >
              {company.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 flex-grow">{children}</div>
    </section>
  );
}
