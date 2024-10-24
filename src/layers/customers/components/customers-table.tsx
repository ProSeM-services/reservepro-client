"use client";
import { ICustomer } from "@/interfaces/customer.interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import Link from "next/link";
import { RootTable } from "@/components/common/root-table";

export default function CustomerTable({
  customers,
}: {
  customers: ICustomer[];
}) {
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
      accessorKey: "apointments",
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

  return <RootTable columns={customerColumns} data={customers} />;
}
