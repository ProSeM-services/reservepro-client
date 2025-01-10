import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICompany } from "@/interfaces";
import CompanyCard from "@/layers/search/components/company-card";
import { ArrowLeftFromLine } from "lucide-react";
export function CompaniesAside({ companies }: { companies: ICompany[] }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"}>
          <ArrowLeftFromLine className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" space-y-4 ">
        <SheetTitle className="flex items-center gap-1 ">
          <h2>Sucursales </h2>
        </SheetTitle>
        <hr />
        <div className="relative  overflow-auto max-h-[90%] h-[90%]">
          <section className=" ">
            <div className="w-full overflow-auto  p-2 max-h-full space-y-5">
              {companies.map((company) => (
                <SheetTrigger className="w-full" key={company.id}>
                  <CompanyCard company={company} key={company.id} isOnMapPage />
                </SheetTrigger>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
