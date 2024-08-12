"use client";
import { ICustomer } from "@/interfaces/customer.interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { RootTable } from "../common/root-table";
import CustomerAside from "./customer-aside";

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
      accessorKey: "_id",
      header: "",
      size: 50,
      cell: ({ row, getValue }) => (
        <CustomerAside customer={{ ...row.original }} />
      ),
    },
  ];

  return <RootTable columns={customerColumns} data={customers} />;
}
