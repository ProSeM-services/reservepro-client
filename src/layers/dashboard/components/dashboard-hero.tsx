"use client";

import React from "react";
import { MemberServices } from "./member-services";
import { DateTime } from "./date-time";
import { useSession } from "next-auth/react";

export function DashboardHero() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between ">
      <div className="space-y-2 py-2">
        <h2 className="font-bold text-3xl text-soft-black">
          Hello, {session?.user?.name || "Guest"}!
        </h2>
        <MemberServices />
      </div>

      <DateTime />
    </header>
  );
}
