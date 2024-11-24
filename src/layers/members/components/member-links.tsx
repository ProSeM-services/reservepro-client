"use client";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { useAppSelector } from "@/store/hooks";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MembersLinks() {
  const pathname = usePathname();
  const { members, loading } = useAppSelector((s) => s.member);
  return (
    <LoaderWrapper loading={loading} type="members">
      <div className="flex md:flex-col max-md:flex-wrap bg-card  h-full gap-4 p-2">
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/dashboard/members/${member.id}`}
            className={` ${
              pathname === `/dashboard/members/${member.id}`
                ? " text-primary  bg-sky-100 "
                : " border-border  text-secondary-foreground "
            }   transition-all duration-300 border rounded-md p-2 flex items-center gap-2 bg-background `}
          >
            <UserCircle />
            <p>
              {" "}
              {member.name} {member.lastName}
            </p>
          </Link>
        ))}
      </div>
    </LoaderWrapper>
  );
}
