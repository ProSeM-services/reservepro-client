import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function AppointmentDataSkeleton() {
  return (
    <Card className="flex flex-col md:w-[30vw] rounded-none gap-4 p-4">
      <header>
        <p className="font-bold text-xl text-gray-700">
          ¿Quieres cancelar el turno?
        </p>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </header>

      <hr />
      <div className="text-gray-500 space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <div className="px-2 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </Card>
  );
}
