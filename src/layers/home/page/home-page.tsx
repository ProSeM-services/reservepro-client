import HomeHeader from "@/layers/home/components/home-header";
import { ClientsFeedback, CompaniesHomeSection } from "@/layers/company/page";
import LandingPage from "@/layers/company/page/landig-page";
interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    city?: string;
  };
}

export function HomePage({ searchParams }: PageProps) {
  return (
    <div className={`flex flex-col     `}>
      <HomeHeader />

      <main className=" min-h-screen  bg-muted">
        <LandingPage />

        <CompaniesHomeSection searchParams={searchParams} />

        <ClientsFeedback />
      </main>

      <footer className="bg-muted  py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Sobre nosotros</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Quiénes somos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Para clientes</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Seguridad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Ayuda
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Para negocios</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Únete a nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Precios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
