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
    <div className={`flex flex-col  `}>
      <HomeHeader />
      <main className=" min-h-screen md:px-24 space-y-6 py-4  bg-gradient-to-r from-blue-500 to-indigo-500 text-white ">
        <LandingPage />
        <CompaniesHomeSection searchParams={searchParams} />
      </main>
    </div>
  );
}
