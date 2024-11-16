"use client";

import React from "react";
import { MemberServices } from "./member-services";
import { DateTime } from "./date-time";
import { useSession } from "next-auth/react";

export function DashboardHero() {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <header className="flex justify-between ">
      <div className="space-y-2 py-2">
        <h2 className="font-bold text-3xl text-foreground">
          Hello, {session?.user?.name}!
        </h2>
        <MemberServices />
      </div>

      <DateTime />
    </header>
  );
}
