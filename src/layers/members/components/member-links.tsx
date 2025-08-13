"use client";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { MemberCard } from "@/layers/dashboard/components";
import { useAppSelector } from "@/store/hooks";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MembersLinks() {
  const pathname = usePathname();
  const { members, loading } = useAppSelector((s) => s.member);
  return (
    <LoaderWrapper loading={loading} type="members">
      <div className="flex md:flex-col gap-4 max-md:flex-wrap ">
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/dashboard/members/${member.id}`}
            className={` ${
              pathname === `/dashboard/members/${member.id}`
                ? " text-primary   "
                : " border-border  text-secondary-foreground "
            }   transition-all duration-300 border rounded-md  flex items-center gap-2 bg-background `}
          >
            <MemberCard member={member} readonly />
          </Link>
        ))}
      </div>
    </LoaderWrapper>
  );
}
