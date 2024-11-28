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
import { EditService } from "./edit-service";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";

export function ServiceDetailsPage({ serviceId }: { serviceId: string }) {
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

  const handleDeleteMember = async (userId: string) => {
    if (!service) return;
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
    <LoaderWrapper loading={loading} type="services">
      <header className="flex justify-between p-2">
        <h2 className="font-semibold">Detalles del servicio</h2>
        <div>{service && <EditService serivce={service} />}</div>
      </header>

      <hr />
      <div className="p-4 space-y-4">
        {service && <ServiceDetailCard service={service} />}

        <div className="space-y-2 relative">
          {deleting && <BarLoader />}
          {service && service.Users.length
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
            {service && (
              <AddMembertoServiceAside
                service={service}
                fetchServiceData={fetchServiceData}
              />
            )}
          </div>
        </div>
      </div>
    </LoaderWrapper>
  );
}
