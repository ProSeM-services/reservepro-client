"use client";
import React, { useState, useEffect } from "react";
import { CurrentStatus } from "./current-status";

export const DateTime: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex  items-center  text-[14px] gap-4">
      <p className="font-medium  text-foreground">
        {formatDate(currentDateTime)}
      </p>
      <CurrentStatus />
    </div>
  );
};
