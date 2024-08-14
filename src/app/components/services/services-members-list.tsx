"use client";
import { IService } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import {
  addMemberToService,
  getMembersFromServices,
  removeMemberFromService,
} from "@/lib/actions";
import React, { useEffect, useState } from "react";
import Avvvatars from "avvvatars-react";
import RemoveMemberButton from "./remove-member-button";
import { BarLoader } from "../common/bar-loader";
import AddMemberToService from "./add-member-toService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function ServicesMemberList({ service }: { service: IService }) {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<IMember[]>([]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await getMembersFromServices(service._id);
      setMembers(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  const handleAddMembers = async (selecetedMembers: string[]) => {
    try {
      const allMembersToAdd = selecetedMembers.map((memberId) =>
        addMemberToService({ serviceId: service._id!, memberId })
      );
      await Promise.all(allMembersToAdd);
      await fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMemberFromService({
        serviceId: service._id,
        memberId,
      });
      await fetchMembers();
    } catch (error) {
      return error;
    }
  };
  return (
    <div className={`${members.length > 0 ? "h-14" : ""}`}>
      {loading && <BarLoader />}

      {members.length && !loading ? (
        <div className="absolute left-0 bottom-0 bg-background  w-[60%] max-h-44 shadow-sm overflow-y-auto p-2 rounded-md">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="h-10">
                <p className="text-xs">Profecionales ({members.length})</p>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <div className="">
                    <AddMemberToService
                      service={service}
                      handleAddMembers={handleAddMembers}
                    />
                  </div>
                  <div className="space-y-1">
                    {members?.map((member) => (
                      <div
                        className="flex items-center  justify-between"
                        key={member._id}
                      >
                        <div className="flex items-center gap-1">
                          <Avvvatars
                            value={`${member.name[0]}${member.lastName[0]}`}
                            style={"character"}
                            size={30}
                          />
                          <p>
                            {member.name} {member.lastName}
                          </p>
                        </div>

                        <RemoveMemberButton
                          member={member}
                          service={service}
                          removeAction={handleRemoveMember}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
}
