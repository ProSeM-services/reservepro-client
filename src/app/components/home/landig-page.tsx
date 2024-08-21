import { libreBaskerville } from "@/lib/fonts";
import React from "react";
import LocationFilter from "../search/location-filter";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="h-screen flex flex-col items-start justify-center pb-8 gradient-bg ">
      <div className="container">
        <h1 className={`text-4xl md:text-6xl font-bold mb-6 text-gray-800 `}>
          Descubre y reserva los mejores servicios locales con facilidad
        </h1>
        <p className="text-xl md:text-xl text-gray-600 mb-8 max-w-2xl text-left">
          Encuentra servicios cerca de ti
        </p>
        <div className="flex gap-4 w-1/2">
          <div className="flex-grow">
            <LocationFilter />
          </div>
          <Link
            href="/search"
            className="bg-primary text-white font-semibold flex items-center px-4 rounded-sm"
          >
            Buscar
          </Link>
        </div>
      </div>
    </section>
  );
}
