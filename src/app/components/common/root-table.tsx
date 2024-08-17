"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowData,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    filterPositon?: "inline" | "bottom";
  }
}
import { Fragment, ReactNode, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowCanExpand?: () => boolean;
  renderSubComponent?: (row: TData) => ReactNode;
  pageSize?: number;
  tableNameRef?: string;
}

export function RootTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    autoResetPageIndex: true,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full flex-grow  flex flex-col  gap-1 relative bg-background  ">
      <div
        className={`rounded-md  border border-border    w-full  max-h-[85%] mx-auto   overflow-y-auto scrollbar-custom `}
      >
        <Table className="table ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="  bg-light-grey   rounded-md  "
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className={` py-3 px-4  border-l  border-border text-start   font-semibold   `}
                  >
                    <div className="flex w-full justify-between items-center">
                      <div>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>

                      <div
                        className={`${
                          header.column.getCanFilter() ? "" : "hidden"
                        }`}
                      ></div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow key={row.id} className={`  text-md    text-left  `}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs  ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
