"use client";
import {
  LogOut,
  LucideHouse,
  MailIcon,
  Settings2Icon,
  UserCircleIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import NavLinks from "./nav-links";
import { ModeToggle } from "../theme-toggler";
import { inter } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
export default function SideNav() {
  const session = useSession();
  const handleLogOut = () => {
    signOut({ callbackUrl: "http://localhost:3000/login", redirect: true });
  };

  return (
    <div className="flex h-full flex-col  ">
      <section className="mb-2 flex relative flex-col h-10  justify-center items-center text-left   bg-primary  md:h-40 ">
        <div className={`text-white ${inter.className} font-bold`}>
          RESERVE PRO
        </div>
        <div className=" absolute top-1 left-1">
          <ModeToggle />
        </div>
      </section>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 ">
        <NavLinks />

        <div className=" rounded-r-2xl bg-primary  text-white  p-2 max-md:px-4 max-md:py-0 flex md:flex-col items-center gap-2 text-md max-md:text-sm ">
          <section className=" w-full">
            <div className="flex items-center gap-2 font-semibold">
              <UserCircleIcon className="size-5 max-md:size-4" />
              <p>{session.data?.user.name}</p>
            </div>
            <div className="md:flex items-center gap-2 font-light text-sm hidden ">
              <MailIcon className="size-5" strokeWidth={1} />
              <p>{session.data?.user.email}</p>
            </div>
            <div className=" items-center gap-2 font-light text-sm hidden md:flex">
              <LucideHouse className="size-5" strokeWidth={1} />
              <p>{session.data?.user.tenantName}</p>
            </div>
            <div className=" items-center gap-2 font-light text-sm hidden md:flex">
              <Settings2Icon className="size-5" strokeWidth={1} />
              <p>{session.data?.user.role}</p>
            </div>
          </section>
          <Button
            className="flex items-center gap-2 ml-auto border border-accent/25  max-md:size-7  max-md:p-0 text-xs h-8 "
            onClick={handleLogOut}
            variant={"ghost"}
          >
            <LogOut className="size-4 max-md:shize-10" />
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
