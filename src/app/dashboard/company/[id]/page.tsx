import React from "react";
import CategoryCard from "@/app/components/dashboard/category-card";
import { getCompanyData } from "@/lib/actions";
import { HomeIcon, MailCheck, MapPinnedIcon, Users2Icon } from "lucide-react";
import WorkhourList from "@/app/components/common/work-hour-list";
import { MemberCard } from "@/app/components/dashboard/card";
import AddMeber from "@/app/components/company/add-member";
import { MapComponent } from "@/app/components/common/map";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = await getCompanyData(id);

  if (!company) return null;
  return (
    <div className="flex flex-col gap-4 flex-grow relative ">
      <div className="flex items-center gap-2">
        <HomeIcon className="size-5" />
        <p className="text-lg font-semibold ">{company?.name}</p>
      </div>
      <hr />

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
          {company.address.lat && company.address.lng ? (
            <MapComponent lat={company.address.lat} lng={company.address.lng} />
          ) : null}
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
