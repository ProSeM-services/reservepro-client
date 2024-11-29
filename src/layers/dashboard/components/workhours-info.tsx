"use client";
import { Card, CardTitle } from "@/components/ui/card";
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
    { short: "dom", long: "Domingo" },
    { short: "lun", long: "Lunes" },
    { short: "mar", long: "Martes" },
    { short: "mie", long: "Miércoles" },
    { short: "jue", long: "Jueves" },
    { short: "vie", long: "Viernes" },
    { short: "sab", long: "Sábado" },
  ];

  if (workhours.length === 0)
    return (
      <Card className="h-full   bg-card  rounded-lg    text-card-foreground flex flex-col items-center gap-4 p-1 border-border">
        <div className="bg-card rounded h-full w-full  p-4 flex flex-col  ">
          <div className="flex items-center justify-between font-bold">
            <CardTitle>Horarios de trabajo</CardTitle>
          </div>

          <div className="flex-grow flex flex-col justify-center items-center text-gray-400">
            <Clock className="size-28" />
            <p className="text-wrap w-2/3 text-center">
              No hay horarios de trabajo definidos
            </p>
          </div>
        </div>
      </Card>
    );
  return (
    <div
      className={`h-full   bg-card  p-2 rounded-lg    text-card-foreground flex flex-col items-center gap-4`}
    >
      <div className="flex items-center gap-1 ">
        <h2 className="text-lg text-center font-bold">Mis Horarios</h2>
        <Clock />
      </div>
      <section className=" w-full flex flex-col gap-2 max-h-[92%] overflow-auto">
        {workhours
          .filter((e) => e.segments.length)
          .map(({ day, segments }, index) => (
            <div
              key={index}
              className="flex flex-col gap-2  flex-grow  items-start    w-full      "
            >
              <div className="border-b w-full px-2">
                <p>{DAYS[day].long}</p>
              </div>
              <div className="flex flex-col items-center gap-2 justify-between flex-grow  w-full">
                {segments.map((seg) => (
                  <div
                    className="flex  gap-4  font-semibold items-center text-xs px-2 w-full justify-center "
                    key={seg.duration}
                  >
                    <div className="   bg-primary p-2 px-4 w-2/3 text-center  rounded text-white">
                      {seg.startime} hs
                    </div>
                    <ArrowRight />
                    <div className="   bg-gray-500  p-2  px-4 w-2/3 text-center rounded text-white">
                      {seg.endTime} hs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
