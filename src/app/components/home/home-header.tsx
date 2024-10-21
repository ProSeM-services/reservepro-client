import React, { PropsWithChildren } from "react";
import SessionLink from "../common/session-link";
import Link from "next/link";

export default function HomeHeader({ children }: PropsWithChildren) {
  return (
    <header
      className="sticky top-0 transition-colors duration-300  shadow-sm z-10 bg-muted "
      id="header"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            <div className="text-2xl font-bold text-primary">
              <span className="text-secondary-foreground">Reserve</span>
              Pro
            </div>
          </Link>{" "}
        </div>
        <div>{children ? children : <SessionLink />}</div>
      </div>
    </header>
  );
}
