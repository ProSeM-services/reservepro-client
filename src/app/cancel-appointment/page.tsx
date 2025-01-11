import React from "react";
import AppointmentData from "./components/appointment-data";
import HomeHeader from "@/layers/home/components/home-header";
import Link from "next/link";

interface PageProps {
  searchParams?: {
    token?: string;
  };
}
export default function CancelAppoitnmentPage({ searchParams }: PageProps) {
  return (
    <div className="bg-card h-screen max-h-screen max-md:h-[80vh] flex flex-col">
      <HomeHeader>
        <Link href={"/"} className="bg-primary text-white p-2 rounded-md px-4">
          Ir al inicio
        </Link>
      </HomeHeader>
      <section className="grid place-items-center   flex-grow">
        {searchParams?.token && <AppointmentData token={searchParams?.token} />}
      </section>
    </div>
  );
}
