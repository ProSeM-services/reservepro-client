import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="md:h-screen  flex flex-col md:items-start md:justify-center pb-8  ">
      <div className="container  max-md:h-[80vh] max-md:flex max-md:flex-col max-md:justify-center pb-10">
        <h1 className={`text-4xl max-md:text-2xl md:text-6xl font-bold mb-6  `}>
          Descubre y reserva los mejores servicios locales con facilidad
        </h1>
        <p className="text-lg md:text-xl  mb-8 max-w-2xl text-left">
          Encuentra servicios cerca de ti
        </p>
        <div className="flex gap-4 ">
          <Link
            href="/search"
            className="bg-primary text-white font-semibold flex items-center px-4 p-2 rounded-sm"
          >
            Buscar
          </Link>
        </div>
      </div>
    </section>
  );
}
