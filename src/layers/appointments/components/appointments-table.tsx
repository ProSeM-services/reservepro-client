"use client";

import { RootTable } from "@/components/common/root-table";
import { ColumnDef } from "@tanstack/react-table";
import { IClientAppointment } from "../interfaces";
import { CancelAppointment } from "./cancel-appointment";
import { AppoitnemntModelAdapter } from "../adapters";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "@/lib/appointments.actions";
import { BarLoader } from "@/components/common/bar-loader";
import { ProfesionalCell } from "./profesional-cell";
import { IMember } from "@/interfaces/member.iterface";
const columns: ColumnDef<IClientAppointment>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre",
    // size: 10,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    // size: 10,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "phone",
    header: "Celular",
    // size: 10,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "date",
    header: "Fecha",
    // size: 200,
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "UserId",
    header: "Profesional",
    enableColumnFilter: false,

    meta: {
      filterVariant: "select",
    },
    // size: 200,
    cell: ({ row }) => <ProfesionalCell user={row.original.User} />,
  },
  {
    accessorKey: "time",
    header: "Fecha",
    // size: 200,
    cell: ({ getValue }) => <p>{getValue<string>()} hs</p>,
  },
  {
    accessorKey: "canceled",
    header: "Estado",
    size: 10,
    cell: ({ getValue }) => (
      <p
        className={`${
          getValue<boolean>() ? "bg-destructive" : "bg-green-500 "
        } font-light  rounded-md w-24 h-6 text-white flex justify-center items-center`}
      >
        {getValue<boolean>() ? "cancelado" : "activo"}
      </p>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    size: 10,
    cell: ({ getValue, row }) =>
      !row.original.canceled ? (
        <CancelAppointment appointmentId={getValue<string>()} />
      ) : null,
  },
];
export function AppointmentsTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

  if (isLoading) return <BarLoader />;
  if (data)
    return (
      <RootTable
        columns={columns}
        data={AppoitnemntModelAdapter(data)}
        tableType="appoitnemnts"
      />
    );
}
