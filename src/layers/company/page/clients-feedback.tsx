import Image from "next/image";
import React from "react";

export function ClientsFeedback() {
  return (
    <section className="h-screen ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-muted p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className=" flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Excelente servicio</h3>
            <p className="text-gray-600 mb-4">
              ReservePro ha simplificado enormemente la forma en que reservo mis
              citas. ¡Muy recomendable!
            </p>
            <div className="flex items-center">
              <Image
                src="/avatars/avatar.webp"
                alt="Usuario 1"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span className="font-medium">María García</span>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className=" flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Muy conveniente</h3>
            <p className="text-gray-600 mb-4">
              La plataforma es fácil de usar y me ahorra mucho tiempo. Solo le
              falta algunas opciones avanzadas.
            </p>
            <div className="flex items-center">
              <Image
                src="/avatars/avatar.webp"
                alt="Usuario 2"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span className="font-medium">Carlos Rodríguez</span>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className=" flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Increíble variedad</h3>
            <p className="text-gray-600 mb-4">
              Me encanta la diversidad de servicios que puedo encontrar. Ha
              cambiado la forma en que organizo mi agenda.
            </p>
            <div className="flex items-center">
              <Image
                src="/avatars/avatar.webp"
                alt="Usuario 3"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span className="font-medium">Ana Martínez</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
