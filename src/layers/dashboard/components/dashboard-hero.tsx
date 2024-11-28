"use client";

import React from "react";
import { DateTime } from "./date-time";
import { useSession } from "next-auth/react";

export function DashboardHero() {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <header className="flex justify-between h-10  items-center ">
      <h2 className="font-semibold text-xl ">Hola, {session?.user?.name}!</h2>

      <DateTime />
    </header>
  );
}
