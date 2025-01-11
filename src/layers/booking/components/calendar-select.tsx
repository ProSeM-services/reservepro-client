"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { BASE_URL } from "@/config/axios.config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BarLoader } from "@/components/common/bar-loader";
import { CalendarIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBookinData } from "@/store/feature/booking/bookingSlice";
type IAvailableList = {
  hs: string;
  available: boolean;
};
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
export function CalendarSelect() {
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [loading, setLoading] = useState(false);
  const { bookingData, step } = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();
  const { member, duration, date, time } = bookingData;
  useEffect(() => {
    if (!date) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${BASE_URL}/appointments/member-slots`, {
          UserId: member?.id,
          date: new Date(date).toISOString(),
          duration: duration,
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
    dispatch(setBookinData({ key: "date", value: value.toISOString() }));
    dispatch(setBookinData({ key: "time", value: "" }));
  };

  const handleSelectTime = (value: string) => {
    dispatch(setBookinData({ key: "time", value }));
  };

  return (
    <div className=" w-full   h-full items-start flex max-md:flex-col gap-4 ">
      <section className="md:hidden flex flex-col   w-full">
        <Label>Seleccionar una fecha</Label>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"outline"}
              className={cn(
                "w-[100%] pl-3 text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date ? new Date(date) : new Date()}
              onSelect={(value) => value && handleDate(value)}
              className="rounded-md  "
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </PopoverContent>
        </Popover>
      </section>
      <Calendar
        mode="single"
        selected={date ? new Date(date) : new Date()}
        onSelect={(value) => value && handleDate(value)}
        className="rounded-md max-md:hidden "
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date < today;
        }}
      />

      {loading ? (
        <div className="flex flex-col relative  w-full h-full items-center justify-center">
          <BarLoader />
        </div>
      ) : availableList.length === 0 && date ? (
        <div className="bg-muted rounded-md w-full text-center p-4">
          <p>No hay horarios disponibles</p>
        </div>
      ) : date ? (
        <div className=" flex  flex-wrap items-start justify-start gap-2   w-full">
          {availableList.map((value) => (
            <div
              className={`border  size-36 flex-grow    grid place-items-center    cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${
                time === value.hs ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleSelectTime(value.hs)}
              key={value.hs}
            >
              <p>{value.hs}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[40vh] text-gray-800">
          <CalendarIcon />
          <p>Seleccionar una fecha</p>
        </div>
      )}
    </div>
  );
}
