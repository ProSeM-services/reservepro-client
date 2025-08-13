import React, { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeHeader({ children }: PropsWithChildren) {
  return (
    <header
      className="sticky top-0 transition-colors duration-300  shadow-sm z-10 bg-white "
      id="header"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={"/"}>
            <div className="text-2xl font-bold text-primary">
              <Image
                src={"/logo.svg"}
                width={100}
                height={100}
                alt="reserve pro"
              />
            </div>
          </Link>{" "}
        </div>
        <div>{children ? children : null}</div>
      </div>
    </header>
  );
}
