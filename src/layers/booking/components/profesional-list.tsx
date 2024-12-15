"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, redirect } from "next/navigation";
import { getServicesMembers } from "@/lib/clienta-actions";
import { IMember } from "@/interfaces/member.iterface";
import { LoaderSpinner } from "@/components/common/loader-spinner";
import { SelectMemberCard } from "../components/select-member-card";
import { useAppSelector } from "@/store/hooks";

export function ProfesionalList() {
  const [users, setUsers] = useState<IMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { bookingData } = useAppSelector((s) => s.booking);
  useEffect(() => {
    const { companyId, serviceId } = bookingData;
    if (!serviceId) return;
    const fetchMembers = async () => {
      if (serviceId) {
        try {
          setIsLoading(true);
          const members = await getServicesMembers(serviceId);
          setUsers(members.filter((m) => m.CompanyId === companyId));
        } catch (error) {
          console.error("Error fetching service members:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMembers();
  }, [bookingData.serviceId]);

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
