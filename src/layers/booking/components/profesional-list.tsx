"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, redirect } from "next/navigation";
import { getServicesMembers } from "@/lib/clienta-actions";
import { IMember } from "@/interfaces/member.iterface";
import { LoaderSpinner } from "@/components/common/loader-spinner";
import { SelectMemberCard } from "../components/select-member-card";
import { useAppSelector } from "@/store/hooks";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";

export function ProfesionalList() {
  const [users, setUsers] = useState<IMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { bookingData } = useAppSelector((s) => s.booking);
  useEffect(() => {
    const { companyId, service } = bookingData;
    if (!service) return;
    const fetchMembers = async () => {
      if (service) {
        try {
          setIsLoading(true);
          const members = await getServicesMembers(service.id);
          setUsers(members.filter((m) => m.CompanyId === companyId));
        } catch (error) {
          console.error("Error fetching service members:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMembers();
  }, [bookingData.service]);

  return (
    <LoaderWrapper type="members" loading={isLoading}>
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
    </LoaderWrapper>
  );
}
