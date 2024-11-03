"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Settings, User } from "lucide-react";
import { QueryClient } from "@tanstack/react-query";
export function UserMenu() {
  const session = useSession();
  const queryClient = new QueryClient();
  const handleLogOut = () => {
    queryClient.clear();
    signOut({ callbackUrl: "http://localhost:3000/login", redirect: true });
  };

  if (!session.data) {
    return null;
  }
  const {
    user: { name, lastName },
  } = session.data;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-primary text-white size-10 flex justify-center items-center rounded-full cursor-pointer">
            <span>
              {session?.data?.user.name ? session?.data?.user.name[0] : null}
            </span>
            <span>
              {session?.data?.user.lastName
                ? session?.data?.user.lastName[0]
                : null}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {name}, {lastName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
