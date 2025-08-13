"use client";

import { SearchIcon, DoorOpenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Buscar", href: "/search", icon: SearchIcon },
  { name: "Ingresar", href: "/dashboard", icon: DoorOpenIcon },
];

export default function HomeLinks() {
  const pathname = usePathname();
  return (
    <section className="flex items-center gap-2">
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
