"use client";
import { setAuthInterceptor } from "@/config/axios.config";
import { IWorkhour } from "@/interfaces";
import { MemberServices } from "@/services/member.services";
import { ArrowRight, Clock1Icon, PenIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      className={`w-1/4   bg-background p-4 rounded-lg    text-gray-700 flex flex-col gap-4`}
    >
      <h2 className="text-lg text-center">Horarios de trabajo</h2>
      <Accordion type="single" collapsible className="">
        {workhours.map(({ day, segments }, index) => (
          <AccordionItem
            value={`day-${day}`}
            key={index}
            className="flex flex-col  flex-grow  items-start    w-full      "
          >
            <AccordionTrigger>
              <p>{DAYS[day].long}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 justify-between flex-grow  w-full">
              {segments.map((seg) => (
                <div className="flex  gap-4  items-center " key={seg.duration}>
                  <div className="   bg-soft-d p-2 px-4  rounded text-white">
                    {seg.startime} hs
                  </div>
                  <ArrowRight />
                  <div className="   bg-soft-g p-2  px-4 rounded text-white">
                    {seg.endTime} hs
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
