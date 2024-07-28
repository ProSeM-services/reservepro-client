"use client";

import {
  HomeIcon,
  GroupIcon,
  DockIcon,
  BellElectric,
  FactoryIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Activity",
    href: "/dashboard/activity",
    icon: DockIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: GroupIcon },
  { name: "Company", href: "/dashboard/company", icon: FactoryIcon },
  { name: "Services", href: "/dashboard/services", icon: BellElectric },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <section className="flex grow flex-row max-md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] transition-all duration-200 grow items-center justify-center gap-2 rounded-md bg-accent p-3 text-sm font-medium hover:bg-sky-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3   ${
              pathname === link.href ? "bg-sky-100 text-primary" : ""
            } `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </section>
  );
}
