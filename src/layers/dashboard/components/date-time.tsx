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

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col items-end">
      <p className="font-medium text-xl text-foreground">
        {formatDate(currentDateTime)}
      </p>
      <CurrentStatus time={formatTime(currentDateTime)} />
    </div>
  );
};
