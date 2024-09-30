"use client";
import React, { useEffect, useState } from "react";
import { IService } from "@/interfaces";
import { MemberCard } from "../dashboard/card";
import AddMembertoServiceAside from "./add-member-aside";
import { ServiceDetailCard } from "./services-card";
import { LoaderSpinner } from "../common/loader-spinner";
import { getServicesById } from "@/lib/actions";

export default function ServiceAsideDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const [service, setService] = useState<IService>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getServicesById(serviceId);
        setService(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }
  return service ? (
    <div className="p-4 space-y-4">
      <ServiceDetailCard service={service} />

      <div className="space-y-2">
        {service.Users.length
          ? service.Users.map((user) => <MemberCard member={user} />)
          : null}
        <div className="">
          Agregar:
          <AddMembertoServiceAside
            service={service}
            handleAddMembers={async () => {}}
          />
        </div>
      </div>
    </div>
  ) : null;
}
