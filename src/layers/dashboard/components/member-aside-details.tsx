"use client";
import { IWorkhour, Segment } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import React, { useState } from "react";
import { WorkhourList } from "./workhours/workhour-list";
import Link from "next/link";
import { PenIcon } from "lucide-react";

interface MemberAsideDetailsProps {
  member: IMember;
}

export function MemberAsideDetails({ member }: MemberAsideDetailsProps) {
  return (
    <div className="p-4 overflow-auto ">
      <header className="mb-6 flex justify-between">
        <div>
          <h2 className="text-xl font-medium">
            {member.name} {member.lastName}
          </h2>
          <p className="text-gray-600">{member.email}</p>
        </div>
        <Link href={`/dashboard/members/${member.id}`}>
          <PenIcon className="size-4" />
        </Link>
      </header>

      <div className="flex-grow space-y-4">
        <div>
          <h3 className="font-medium mb-2">Company Information</h3>
          <p className="text-gray-700">Company: {member.companyName}</p>
          {member.CompanyId && (
            <p className="text-gray-700">Company ID: {member.CompanyId}</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">Contact Details</h3>
          <p className="text-gray-700">Username: {member.userName}</p>
          {member.phone && (
            <p className="text-gray-700">Phone: {member.phone}</p>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">Role & Access</h3>
          <p className="text-gray-700">Role: {member.role}</p>
        </div>

        {member.image && (
          <div>
            <h3 className="font-medium mb-2">Profile Image</h3>
            <img
              src={member.image}
              alt={`${member.name}'s profile`}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
        {member.workhours && (
          <div>
            <h3 className="font-medium mb-2">Horarios de trabajo</h3>
            <WorkhourList workhours={member.workhours} />
          </div>
        )}
      </div>
    </div>
  );
}
