"use client";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function BreadcrumbLinks() {
  const [pathSegments, setPathSegments] = React.useState<string[]>([]);
  const path = usePathname();

  useEffect(() => {
    const segments = path.split("/").filter((segment) => segment !== "");
    setPathSegments(segments);
  }, [path]);

  return (
    <div>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {index === pathSegments.length - 1 ? (
                  <BreadcrumbPage>
                    {" "}
                    {segment[0].toUpperCase().concat(segment.slice(1))}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    >
                      {segment[0].toUpperCase().concat(segment.slice(1))}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
