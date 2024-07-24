import React, { Suspense } from "react";
import CompanyList from "@/app/components/dashboard/company-list";
import MemberList from "@/app/components/dashboard/member-list";
import AddButton from "../components/dashboard/add-button";

export default async function page() {
  return (
    <div className=" h-full flex flex-col gap-4">
      <section>
        <div className="flex  flex-col gap-4">
          <div className="flex items-center gap-2 mr-auto ">
            <span className="">Add Company</span>
            <AddButton type="company" />
          </div>
          <Suspense fallback={"Loading ..."}>
            <CompanyList />
          </Suspense>
        </div>
      </section>
      <hr />
      <section>
        <div className="flex  flex-col gap-4">
          <div className="flex items-center gap-2 mr-auto ">
            <span className="">Add Company</span>
            <AddButton type="member" />
          </div>
          <Suspense fallback={"Loading ..."}>
            <MemberList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
