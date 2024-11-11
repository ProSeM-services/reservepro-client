"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { IService } from "@/interfaces";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { ServicesServices } from "@/services/services.services";
export function MemberServices() {
  const session = useSession();
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    const fetch = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        const res = await ServicesServices.getByMemberId(session.data.user.id);
        setServices(res);
      } catch (error) {
        console.log("Error fetching today appointments : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [session.data]);

  if (loading) return <>..</>;
  return (
    <div className="flex gap-2 items-center   ">
      {services.map((service) => (
        <div
          key={service.id}
          className="px-4  rounded-lg bg-accent-foreground/85 text-sm text-white"
        >
          {service.title}
        </div>
      ))}
    </div>
  );
}
