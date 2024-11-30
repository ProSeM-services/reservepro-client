"use client";
import { RootTable } from "@/components/common/table/root-table";
import { ColumnDef } from "@tanstack/react-table";
import { IClientAppointment } from "../interfaces";
import { CancelAppointment } from "./cancel-appointment";
import { AppoitnemntModelAdapter } from "../adapters";
import { ProfesionalCell } from "./profesional-cell";
import { useAppSelector } from "@/store/hooks";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
const columns: ColumnDef<IClientAppointment>[] = [
  {
    accessorKey: "fullName",
    header: "Nombre",
    size: 200,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: false,
    meta: {
      filterVariant: "select",
      filterType: "customers",
    },
    size: 200,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "phone",
    header: "Celular",
    size: 200,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },

  {
    accessorKey: "UserId",
    header: "Profesional",
    enableColumnFilter: false,
    meta: {
      filterVariant: "select",
      filterType: "members",
    },
    size: 200,
    cell: ({ row }) => <ProfesionalCell user={row.original.User} />,
  },
  {
    accessorKey: "date",
    header: "Dia",
    size: 80,
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "time",
    header: "Fecha",
    size: 80,
    cell: ({ getValue }) => <p>{getValue<string>()} hs</p>,
  },
  {
    accessorKey: "canceled",
    header: "Estado",
    size: 100,
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
  const { appointments, loading, fetched, limit, offset, page, total } =
    useAppSelector((s) => s.appointments);

  return (
    <LoaderWrapper loading={loading && !fetched} type="appointments">
      <div className="flex w-full justify-around">
        <p>limit:{limit}</p>
        <p>offset:{offset}</p>
        <p>page:{page}</p>
        <p>total:{total}</p>
      </div>
      <RootTable
        columns={columns}
        data={AppoitnemntModelAdapter(appointments)}
        tableType="appoitnemnts"
      />
    </LoaderWrapper>
  );
}
