import React from "react";
import CategoryCard from "@/app/components/dashboard/category-card";
import DynamicMap from "@/app/components/dashboard/dynamic-map";
import { getCompanyData } from "@/lib/actions";
import { MailCheck, MapPinnedIcon, Users2Icon } from "lucide-react";
import WorkhourList from "@/app/components/common/work-hour-list";
import { MemberCard } from "@/app/components/dashboard/card";
import AddMeber from "@/app/components/company/add-member";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = await getCompanyData(id);

  if (!company) return null;
  return (
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
        <section className="mt-2  bg-background">
          <div className="flex  justify-between p-2">
            <p className="font-semibold">
              Miembros{" "}
              <span className="text-gray-400 text-sm">
                {" "}
                ({company.members?.length}){" "}
              </span>
            </p>
            <AddMeber company={company} />
          </div>
          {company.members?.length ? (
            <div>
              {company.members.map((member) => (
                <MemberCard member={member} key={member._id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 bg-background border border-accent    h-52 w-full rounded-md  items-center justify-center    ">
              <Users2Icon className="size-10" />
              <p className="font-light text-sm w-60  text-center">
                No tenes miembros cargados en este equipo.
              </p>
            </div>
          )}
        </section>
        <hr />
        <div className="mt-2">
          <p className="font-semibold">Horarios</p>
          {company.workhours ? (
            <WorkhourList worhHours={company.workhours} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
