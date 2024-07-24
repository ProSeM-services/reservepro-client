"use client";
import { HousePlusIcon, LogOut, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import NavLinks from "./nav-links";
import { ModeToggle } from "../theme-toggler";
export default function SideNav() {
  const session = useSession();
  const handleLogOut = () => {
    signOut({ callbackUrl: "http://localhost:3000/login", redirect: true });
  };

  return (
    <div className="flex h-full flex-col p-2  ">
      <section className="mb-2 flex flex-col h-10  justify-center items-center text-left  rounded-md bg-primary  md:h-40">
        <div className="flex items-center w-5/6 mx-auto gap-2">
          <User2Icon />
          <p>{session.data?.user.name}</p>
        </div>
        <div className="flex items-center w-5/6 mx-auto gap-2">
          <HousePlusIcon />
          <p>{session.data?.user.companyName}</p>
        </div>
      </section>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 ">
        <NavLinks />
        <div className=" h-auto w-full grow rounded-md bg-accent block  justify-end">
          <ModeToggle />
        </div>

        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-accent p-3 text-sm font-medium transition-all duration-150 hover:bg-sky-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={handleLogOut}
        >
          <LogOut className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
