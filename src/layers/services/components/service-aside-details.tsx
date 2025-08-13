"use client";
import React, { useEffect, useState } from "react";
import { IService } from "@/interfaces";
import AddMembertoServiceAside from "./add-member-aside";
import { ServiceDetailCard } from "./services-card";
import { getServicesById, removeMemberFromService } from "@/lib/actions";
import { LoaderSpinner } from "@/components/common/loader-spinner";
import { MemberCard } from "@/layers/dashboard/components/card";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "@/components/common/bar-loader";

export default function ServiceAsideDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const [service, setService] = useState<IService>();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fetchServiceData = async () => {
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
  useEffect(() => {
    fetchServiceData();
  }, []);
  if (loading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }
  if (!service) return null;

  const handleDeleteMember = async (userId: string) => {
    try {
      setDeleting(true);
      await removeMemberFromService({ serviceId: service?.id, userId });
      await fetchServiceData();
    } catch (error) {
      console.log("Error");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <ServiceDetailCard service={service} />

      <div className="space-y-2 relative">
        {deleting && <BarLoader />}
        {service.Users.length
          ? service.Users.map((user) => (
              <div className="flex items-center gap-2 " key={user.id}>
                <Button
                  disabled={deleting}
                  size={"icon"}
                  variant={"ghost"}
                  className="size-8"
                  onClick={() => handleDeleteMember(user.id)}
                >
                  <TrashIcon className="size-3" />
                </Button>
                <MemberCard member={user} />
              </div>
            ))
          : null}
        <div className="">
          Agregar:
          <AddMembertoServiceAside
            service={service}
            fetchServiceData={fetchServiceData}
          />
        </div>
      </div>
    </div>
  );
}
