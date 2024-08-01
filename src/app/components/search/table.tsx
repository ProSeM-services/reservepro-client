import { HomeIcon, MailIcon, MapPinned } from "lucide-react";
import { getClientComapnies } from "@/lib/clienta-actions";
import CategoryCard from "../dashboard/category-card";

export default async function SearchTable({
  query,
  category,
  city,
}: {
  query: string;
  category: string;
  city: string;
  currentPage: number;
}) {
  const companies = await getClientComapnies({ query, category, city });

  return (
    <section className="  grid grid-cols-3 gap-2 flex-wrap max-w-full w-full  ">
      {companies?.map((company) => (
        <div className=" flex flex-col justify-center items-center gap-3 p-4 rounded-sm border border-accent shadow-sm lg:flex-grow    h-40 bg-white max-lg:w-full ">
          <section className="flex w-full flex-col text-[14px]">
            <div className="flex items-center gap-2  font-bold ">
              <HomeIcon className=" size-4" />
              <span className=" ">{company.name}</span>
            </div>
            <div className="flex items-center gap-2 w-full  ">
              <MapPinned className="size-4 " />
              <p
                className={`
                      truncate   max-w-[90%] max-lg:w-56 text-left`}
              >
                {company.address.value}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full   ">
              <MailIcon className="size-4" />
              <p
                className={`
                      truncate   max-w-[90%] max-lg:w-56 text-left`}
              >
                {company.email}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full max-w-full overflow-y-auto my-2 text-[11px]  ">
              {company.category.map((category) => (
                <CategoryCard category={category} selected={false} />
              ))}
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}
