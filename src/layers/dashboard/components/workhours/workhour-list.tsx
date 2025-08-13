import { IWorkhour } from "@/interfaces";
interface WorkhourListProps {
  workhours: IWorkhour[];
}
export function WorkhourList({ workhours }: WorkhourListProps) {
  const DAYS = [
    { short: "dom", long: "domingo" },
    { short: "lun", long: "lunes" },
    { short: "mar", long: "martes" },
    { short: "mie", long: "mié rcoles" },
    { short: "jue", long: "jueves" },
    { short: "vie", long: "viernes" },
    { short: "sab", long: "sábado" },
  ];

  return (
    <div className={`flex gap-4  w-full`}>
      {workhours.map(({ day, segments }) => (
        <div key={day} className=" flex flex-col w-full gap-4 items-center">
          <p className=" font-bold uppercase  ">{DAYS[day].short}</p>
          <div className="flex flex-col items-center gap-2   ">
            {segments.map((seg, index) => (
              <div key={index}>
                <div className="flex  flex-col items-center">
                  <p>{seg.startime}</p>
                  <p>{seg.endTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
