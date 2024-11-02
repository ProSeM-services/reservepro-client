"use client";
import { ICustomer } from "@/interfaces/customer.interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import Link from "next/link";
import { RootTable } from "@/components/common/table/root-table";
import { getCustomers } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { BarLoader } from "@/components/common/bar-loader";
import { UserSearchIcon } from "lucide-react";
const customerColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "firstName",
    header: "Nombre",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "phone",
    header: "Celular",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "Appointments",
    header: "Turnos Agendados",
    size: 50,
    cell: ({ getValue }) => <b>{getValue<[]>().length}</b>,
  },
  {
    accessorKey: "id",
    header: "",
    size: 50,
    cell: ({ row, getValue }) => (
      <Link
        className="bg-secondary text-center text-primary hover:bg-sky-100 transition-all duration-150  flex  justify-center p-1 rounded-md  text-xs font-semibold "
        href={`/dashboard/customers/${row.original.id}`}
      >
        detalles
      </Link>
    ),
  },
];
export default function CustomerTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  if (isLoading)
    return (
      <div className="relative h-full">
        <BarLoader />
        <div className=" p-10 h-full w-full flex flex-col gap-4 justify-center items-center">
          <UserSearchIcon className="size-10" />
          Cargando clientes...
        </div>
      </div>
    );

  if (data) return <RootTable columns={customerColumns} data={data} />;
}
