"use client";
import React from "react";
import { MemberCard } from "./card";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { useAppSelector } from "@/store/hooks";

export function MemberList() {
  const { members, loading } = useAppSelector((s) => s.member);

  return (
    <LoaderWrapper loading={loading} type="members">
      <div className="space-y-2">
        {members?.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </div>
    </LoaderWrapper>
  );
}
