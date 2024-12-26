"use client";

import React from "react";
import { useSession } from "next-auth/react";

export function DashboardHero() {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <header className="flex justify-between h-full  items-center ">
      <h2 className="font-medium text-xl ">Hola, {session?.user?.name}!</h2>
    </header>
  );
}
