import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardHero } from "@/layers/dashboard/components";
import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <section className="h-10">
              <DashboardHero />
            </section>
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
