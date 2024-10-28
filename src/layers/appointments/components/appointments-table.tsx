import { RootTable } from "@/components/common/root-table";
import { ColumnDef } from "@tanstack/react-table";
import { IClientAppointment } from "../interfaces";
const customerColumns: ColumnDef<IClientAppointment>[] = [
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
    accessorKey: "canceled",
    header: "Estado",
    size: 10,
    cell: ({ getValue }) => (
      <p
        className={`${
          getValue<boolean>() ? "bg-destructive" : "bg-green-500 "
        }  rounded-md w-24 h-6 text-white flex justify-center items-center`}
      >
        {getValue<boolean>() ? "cancelado" : "activo"}
      </p>
    ),
  },
];
export function AppointmentsTable({
  appointmnets,
}: {
  appointmnets: IClientAppointment[];
}) {
  return <RootTable columns={customerColumns} data={appointmnets} />;
}
