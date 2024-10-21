"use client";

import { useState, useEffect } from "react";

import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { BASE_URL } from "@/config/axios.config";
import { BarLoader } from "@/app/components/common/bar-loader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type IAvailableList = {
  hs: string;
  available: boolean;
};
export function CalendarSelect() {
  const [date, setDate] = useState<Date>(new Date());
  const { push } = useRouter();
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${BASE_URL}/appointments/member-slots`, {
          UserId: params.get("member"),
          date: new Date(date).toISOString(),
          duration: 45,
        });

        setAvailableList(res.data.availableTimes);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  const handleDate = (value: Date) => {
    setDate(value);
  };

  const handleSelectTime = (time: string) => {
    params.set("time", time);
    push(`${pathname}/?${params.toString()}`);
  };
  return (
    <div className=" w-full   h-full items-start flex gap-4 ">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(value) => value && handleDate(value)}
        className="rounded-md  "
      />

      {loading ? (
        <div className="flex flex-col relative  w-full h-full items-center justify-center">
          <BarLoader />
        </div>
      ) : availableList.length === 0 ? (
        <div className="bg-muted rounded-md w-full text-center p-4">
          <p>No hay horarios disponibles</p>
        </div>
      ) : (
        <div className=" flex flex-wrap items-start justify-start gap-2   w-full">
          {availableList.map((value) => (
            <div
              className="border  size-36 flex-grow    grid place-items-center    cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => handleSelectTime(value.hs)}
              key={value.hs}
            >
              <p>{value.hs}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
