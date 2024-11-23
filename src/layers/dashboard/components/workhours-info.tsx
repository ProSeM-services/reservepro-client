"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { IWorkhour } from "@/interfaces";
import { MemberServices } from "@/services/member.services";
import { ArrowRight, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function WorkhourInfo() {
  const session = useSession();
  const [workhours, setWorkhours] = useState<IWorkhour[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!session.data || !session.data?.backendTokens?.accessToken) return;
    const fetch = async () => {
      try {
        setLoading(true);
        await setAuthInterceptor(session.data?.backendTokens.accessToken);
        const res = await MemberServices.getById(session.data.user.id);
        setWorkhours(res.workhours || []);
      } catch (error) {
        console.log("Error fetching today appointments : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [session.data]);

  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "miércoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];
  return (
    <div
      className={`h-full   bg-card p-4 rounded-lg    text-card-foreground flex flex-col items-center gap-4`}
    >
      <div className="flex items-center gap-1">
        <h2 className="text-lg text-center font-bold">Mis Horarios</h2>
        <Clock />
      </div>

      {workhours.map(({ day, segments }, index) => (
        <div
          key={index}
          className="flex flex-col gap-1  flex-grow  items-start    w-full      "
        >
          <div className="border-b w-full">
            <p>{DAYS[day].long}</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-between flex-grow  w-full">
            {segments.map((seg) => (
              <div
                className="flex  gap-4  items-center text-xs "
                key={seg.duration}
              >
                <div className="   bg-soft-d p-2 px-4  rounded text-white">
                  {seg.startime} hs
                </div>
                <ArrowRight />
                <div className="   bg-soft-g p-2  px-4 rounded text-white">
                  {seg.endTime} hs
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
