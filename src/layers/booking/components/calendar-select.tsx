"use client";

import { useState, useEffect } from "react";

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
export function CalendarSelect() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { push, back } = useRouter();
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { bookingData } = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();
  const { companyId, member, duration, date, time } = bookingData;
  useEffect(() => {
    if (!selectedDate) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${BASE_URL}/appointments/member-slots`, {
          UserId: member,
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
    setSelectedDate(value);
  };

  const handleSelectTime = (value: string) => {
    dispatch(setBookinData({ key: "time", value }));
  };

  return (
    <div className=" w-full   h-full items-start flex gap-4 ">
      <Calendar
        mode="single"
        selected={selectedDate ? selectedDate : new Date()}
        onSelect={(value) => value && handleDate(value)}
        className="rounded-md  "
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
      ) : availableList.length === 0 && selectedDate ? (
        <div className="bg-muted rounded-md w-full text-center p-4">
          <p>No hay horarios disponibles</p>
        </div>
      ) : selectedDate ? (
        <div className=" flex flex-wrap items-start justify-start gap-2   w-full">
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
