"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { IWorkhour } from "@/interfaces";
import { MemberServices } from "@/services/member.services";
import { ArrowRight, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
export function CurrentStatus({ time }: { time: string }) {
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

  const today = new Date();
  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "miércoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];

  const todayNumber = today.getDay();
  const todaySegmnets = workhours.filter((wh) => wh.day === todayNumber)[0]
    .segments;
  const lastSegment = todaySegmnets[todaySegmnets.length - 1];
  return (
    <div
      className={` px-4  rounded-md text-white ${
        lastSegment.endTime > time ? "bg-green-500" : "bg-slate-500"
      }`}
    >
      {lastSegment.endTime > time ? "Active" : "Off"}
    </div>
  );
}
