"use client";
import { IWorkhour, Segment } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import React, { useState } from "react";
import { MemberServices } from "@/services/member.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { updateMember } from "@/lib/user.actions";
import { useToast } from "@/components/ui/use-toast";

const DAYS = [
  { short: "dom", long: "domingo" },
  { short: "lun", long: "lunes" },
  { short: "mar", long: "martes" },
  { short: "mie", long: "miércoles" },
  { short: "jue", long: "jueves" },
  { short: "vie", long: "viernes" },
  { short: "sab", long: "sábado" },
];

export const WorkhoursEditor: React.FC<{ member: IMember }> = ({ member }) => {
  const { toast } = useToast();

  const [workhours, setWorkhours] = useState<IWorkhour[]>(
    member.workhours || []
  );

  const [week, setWeek] = useState(
    DAYS.map((day, index) => ({
      ...day,
      workhour: member.workhours?.find((e) => e.day === index) || {
        day: index,
        segments: [],
      },
    }))
  );

  const [updating, setUpdating] = useState(false);

  const handleSegmentChange = (
    day: number,
    segmentIndex: number,
    updatedSegment: Partial<Segment>
  ) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: entry.workhour.segments.map((segment, index) =>
                  index === segmentIndex
                    ? { ...segment, ...updatedSegment }
                    : segment
                ),
              },
            }
          : entry
      )
    );
  };

  const handleAddSegment = (day: number) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: [
                  ...entry.workhour.segments,
                  { startime: "", endTime: "", duration: 0 },
                ],
              },
            }
          : entry
      )
    );
  };

  const handleRemoveSegment = (day: number, segmentIndex: number) => {
    setWeek((prev) =>
      prev.map((entry) =>
        entry.workhour?.day === day
          ? {
              ...entry,
              workhour: {
                ...entry.workhour,
                segments: entry.workhour.segments.filter(
                  (_, index) => index !== segmentIndex
                ),
              },
            }
          : entry
      )
    );
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      const updatedWorkhours = week.map((entry) => entry.workhour);
      await updateMember(member.id, { workhours: updatedWorkhours });
      toast({
        title: "Horarios actualizados",
        variant: "success",
      });
    } catch (error) {
      console.error("Error actualizando workhours:", error);
      alert("Hubo un error al actualizar los workhours.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-4">
      <section className="grid grid-cols-3 w-full gap-4">
        {week.map((entry) => (
          <Card
            key={entry.short}
            className="flex flex-col border-none items-start gap-2 rounded-none w-full   p-2"
          >
            <p className="font-bold uppercase">{entry.long}</p>
            <div className="flex flex-col items-start gap-4 w-full">
              {entry.workhour.segments.map((segment, segmentIndex) => (
                <div
                  key={segmentIndex}
                  className="flex items-center w-full gap-4"
                >
                  <div className="flex w-full gap-2">
                    <Input
                      type="time"
                      value={segment.startime}
                      onChange={(e) =>
                        handleSegmentChange(entry.workhour.day, segmentIndex, {
                          startime: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="time"
                      value={segment.endTime}
                      onChange={(e) =>
                        handleSegmentChange(entry.workhour.day, segmentIndex, {
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={() =>
                      handleRemoveSegment(entry.workhour.day, segmentIndex)
                    }
                    variant="destructive"
                    size="icon"
                    className="size-6"
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleAddSegment(entry.workhour.day)}
              variant="secondary"
              className="text-xs space-x-2 w-full"
            >
              <PlusIcon className="  size-4" />
              <span>Agregar Segmento</span>
            </Button>
          </Card>
        ))}
      </section>
      <Button onClick={handleSave} isLoading={updating}>
        Actualizar Horarios
      </Button>
    </div>
  );
};
