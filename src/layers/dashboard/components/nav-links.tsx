"use client";

import {
  HomeIcon,
  GroupIcon,
  DockIcon,
  BellElectric,
  FactoryIcon,
  Settings,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/app/components/theme-toggler";
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Activity",
    href: "/dashboard/activity",
    icon: DockIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: GroupIcon },
  { name: "Appointmnets", href: "/dashboard/appointment", icon: CalendarCheck },

  { name: "Company", href: "/dashboard/company", icon: FactoryIcon },
  { name: "Services", href: "/dashboard/services", icon: BellElectric },
];

export function NavLinks({ size = "sm" }: { size?: "sm" | "bg" }) {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <nav className="flex md:flex-col items-center gap-4 px-2 sm:py-5">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const selected = pathname === link.href;
          return size === "sm" ? (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    selected
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <LinkIcon className="size-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.name}</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-2.5 ${
                selected ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              <LinkIcon className="size-5" />
              {link.name}
            </Link>
          );
        })}
        <div className="bg-muted rounded-md">
          <ModeToggle />
        </div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  );
}
