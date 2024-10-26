"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, redirect } from "next/navigation";
import { getServicesMembers } from "@/lib/clienta-actions";
import { IMember } from "@/interfaces/member.iterface";
import { LoaderSpinner } from "@/components/common/loader-spinner";
import { SelectMemberCard } from "../components";

export function ProfesionalPage() {
  const [users, setUsers] = useState<IMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const serviceId = searchParams.get("service");

  useEffect(() => {
    const fetchMembers = async () => {
      if (serviceId) {
        try {
          setIsLoading(true);
          const members = await getServicesMembers(serviceId);
          setUsers(members);
        } catch (error) {
          console.error("Error fetching service members:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMembers();
  }, [serviceId]);

  if (!serviceId) {
    const redirectionURL = pathname
      .split("/")
      .splice(0, pathname.split("/").length - 1)
      .join("/");
    return redirect(redirectionURL);
  }

  return (
    <div className="space-y-4 ">
      {isLoading ? (
        <p className="flex items-center gap-2">
          Cargando
          <LoaderSpinner />
        </p>
      ) : users.length === 0 ? (
        "No hay profesionales disponibles"
      ) : (
        users.map((member) => (
          <SelectMemberCard member={member} key={member.id} />
        ))
      )}
    </div>
  );
}
