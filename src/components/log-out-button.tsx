"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function LogOutButton() {
  const handleLogOut = () => {
    signOut({ callbackUrl: "http://localhost:3000/login", redirect: true });
  };

  return (
    <Button variant={"ghost"} onClick={handleLogOut}>
      {" "}
      <LogOut />
      Log out
    </Button>
  );
}
