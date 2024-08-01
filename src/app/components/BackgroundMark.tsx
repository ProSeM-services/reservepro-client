import { inter } from "@/lib/fonts";
import React from "react";
export const WaterMark = () => (
  <p
    className={`font-bold text-[100px] rotate-[-20deg]  max-md:text-[75px] ${inter.className}`}
  >
    Reserve Pro
  </p>
);
export const BackgroundMark = ({ opacity = 2 }: { opacity?: number }) => {
  return (
    <section
      className={`fixed w-full h-full bg-background/50 flex  items-center justify-center -z-5 opacity-5 select-none `}
    >
      <div className="flex flex-col gap-4">
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
      </div>
      <div className="flex flex-col gap-4">
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
      </div>
      <div className="flex flex-col gap-4">
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
        <WaterMark />
      </div>
    </section>
  );
};
