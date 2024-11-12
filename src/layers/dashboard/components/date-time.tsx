"use client";
import React, { useState, useEffect } from "react";
import { CurrentStatus } from "./current-status";

export const DateTime: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(); // Formato: HH:MM:SS
  };

  return (
    <div className="flex flex-col items-end">
      <p className="font-bold text-xl text-soft-black">
        {formatDate(currentDateTime)}
      </p>
      <p className="text-gray-500">{formatTime(currentDateTime)}</p>
      <CurrentStatus time={formatTime(currentDateTime)} />
    </div>
  );
};
