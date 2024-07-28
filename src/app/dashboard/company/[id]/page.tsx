import React from "react";
import CategoryCard from "@/app/components/dashboard/category-card";
import DynamicMap from "@/app/components/dashboard/dynamic-map";
import { getCompanyData } from "@/lib/actions";
import { MailCheck, MapPinnedIcon, Users2Icon } from "lucide-react";
import WorkhourList from "@/app/components/common/work-hour-list";
import { MemberCard } from "@/app/components/dashboard/card";
import { Button } from "@/components/ui/button";
import AddMeber from "@/app/components/company/add-member";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = await getCompanyData(id);

  if (!company) return null;
  return (
    <section className="flex gap-2">
      <div className="flex flex-col gap-4 flex-grow">
        <p className="text-xl font-bold">{company?.name}</p>
        <hr />
        <p>Categorias</p>
        <div className="flex gap-2">
          {company.category.map((cat) => (
            <CategoryCard key={cat} category={cat} selected />
          ))}
        </div>

        <div className="flex items-center font-light gap-2">
          <MailCheck className="size-5" />
          <p>{company.email}</p>
        </div>

        <div className="flex flex-col ">
          <div className="flex items-center gap-2 font-light">
            <MapPinnedIcon className="size-5" />

            <p>{company.address.value}</p>
          </div>
          <div className="h-[40vh] w-full">
            {company.address.value && (
              <DynamicMap address={company.address.value} />
            )}
          </div>

          <hr />
          <div className="mt-2">
            <p className="font-semibold">Miembros</p>
            {company.members?.length ? (
              <div>
                {company.members.map((member) => (
                  <MemberCard member={member} key={member._id} />
                ))}
              </div>
            ) : (
              <div className="bg-accent    h-52 w-full rounded-md flex flex-col items-center justify-center text-center   ">
                <Users2Icon className="size-10" />
                No tenes miembros cargados en este equipo.
                <AddMeber />
              </div>
            )}
          </div>
          <hr />
          <div className="mt-2">
            <p className="font-semibold">Horarios</p>
            {company.workhours ? (
              <WorkhourList worhHours={company.workhours} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
