import { getAllAppointments } from "@/lib/appointments.actions";
import { AppointmentProvider, AppointmentsTable } from "../components";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export async function AppointmentPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });
  return (
    <AppointmentProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppointmentsTable />
      </HydrationBoundary>
    </AppointmentProvider>
  );
}
