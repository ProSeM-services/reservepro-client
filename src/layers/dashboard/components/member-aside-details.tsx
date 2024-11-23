"use client";
import { WorkhourList } from "./workhours/workhour-list";
import { Input } from "@/components/ui/input";
import { IWorkhour, Segment } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import React, { useState } from "react";
import { WorkhoursEditor } from "./workhours/wh-editor";

interface MemberAsideDetailsProps {
  member: IMember;
}

export function MemberAsideDetails({ member }: MemberAsideDetailsProps) {
  const [workhours, setWorkhours] = useState<IWorkhour[]>(() => {
    if (member.workhours && member.workhours.length > 0) {
      return member.workhours;
    }
    return [];
  });

  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "mié rcoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];

  const handleEditWorkhours = (
    day: number,
    key: keyof Segment,
    segmentIndex: number,
    value: string
  ) => {
    setWorkhours((s) => {
      const dayToEdit = s.filter((wh) => wh.day === day)[0];
      console.log(value);
      dayToEdit.segments[segmentIndex][key];

      return [...s, dayToEdit];
    });
  };

  return (
    <div className="p-4 overflow-auto ">
      <header className="mb-6">
        <h2 className="text-xl font-medium">
          {member.name} {member.lastName}
        </h2>
        <p className="text-gray-600">{member.email}</p>
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
        <WorkhoursEditor member={member} />
      </div>
    </div>
  );
}
