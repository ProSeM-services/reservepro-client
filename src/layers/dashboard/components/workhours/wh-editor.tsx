import { IWorkhour, Segment } from "@/interfaces";
import { IMember } from "@/interfaces/member.iterface";
import React, { useState } from "react";
import { MemberServices } from "@/services/member.services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WorkhoursEditor: React.FC<{ member: IMember }> = ({ member }) => {
  // Estado local para los `workhours`
  const [workhours, setWorkhours] = useState<IWorkhour[]>(
    member.workhours || []
  );
  const [updating, setUpdating] = useState(false);

  // Función para manejar cambios en un segmento específico
  const handleSegmentChange = (
    day: number,
    segmentIndex: number,
    updatedSegment: Partial<Segment>
  ) => {
    setWorkhours((prev) =>
      prev.map((workhour) =>
        workhour.day === day
          ? {
              ...workhour,
              segments: workhour.segments.map((segment, index) =>
                index === segmentIndex
                  ? { ...segment, ...updatedSegment }
                  : segment
              ),
            }
          : workhour
      )
    );
  };

  // Función para agregar un nuevo segmento
  const handleAddSegment = (day: number) => {
    setWorkhours((prev) =>
      prev.map((workhour) =>
        workhour.day === day
          ? {
              ...workhour,
              segments: [
                ...workhour.segments,
                { startime: "", endTime: "", duration: 0 },
              ],
            }
          : workhour
      )
    );
  };
  // Función para eliminar un segmento
  const handleRemoveSegment = (day: number, segmentIndex: number) => {
    setWorkhours((prev) =>
      prev.map((workhour) =>
        workhour.day === day
          ? {
              ...workhour,
              segments: workhour.segments.filter(
                (_, index) => index !== segmentIndex
              ),
            }
          : workhour
      )
    );
  };
  // Función para guardar los cambios
  const handleSave = async () => {
    try {
      setUpdating(true);
      const res = await MemberServices.update(member.id, { workhours }); // PATCH con solo `workhours`
      console.log("Workhours actualizados correctamente:", { res });
      alert("Workhours actualizados correctamente");
    } catch (error) {
      console.error("Error actualizando workhours:", error);
      alert("Hubo un error al actualizar los workhours.");
    } finally {
      setUpdating(false);
    }
  };

  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "miércoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];

  return (
    <div className="flex flex-col items-end gap-4">
      <section className="flex flex-col w-full gap-4">
        {workhours.map((workhour, dayIndex) => (
          <Card
            key={workhour.day}
            className="flex flex-col  items-start  gap-8 w-full p-2"
          >
            <p className=" font-bold uppercase w-1/6 ">
              {DAYS[workhour.day].long}
            </p>

            <div className="flex flex-col items-start justify-start gap-4  w-full ">
              {workhour.segments.map((segment, segmentIndex) => (
                <div key={segmentIndex} className=" flex  items-center  w-full">
                  <div className="flex w-full">
                    <Input
                      type="time"
                      value={segment.startime}
                      onChange={(e) =>
                        handleSegmentChange(workhour.day, segmentIndex, {
                          startime: e.target.value,
                        })
                      }
                    />

                    <Input
                      type="time"
                      value={segment.endTime}
                      onChange={(e) =>
                        handleSegmentChange(workhour.day, segmentIndex, {
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={() =>
                      handleRemoveSegment(workhour.day, segmentIndex)
                    }
                    variant="destructive"
                    className="size-6"
                    size={"icon"}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleAddSegment(workhour.day)}
              variant={"secondary"}
              className="space-x-2"
            >
              <span>Add</span>
              <PlusIcon className="size-4" />
            </Button>
          </Card>
        ))}
      </section>
      <Button onClick={handleSave} variant={"secondary"} isLoading={updating}>
        Actaulizar Horarios
      </Button>
    </div>
  );
};
