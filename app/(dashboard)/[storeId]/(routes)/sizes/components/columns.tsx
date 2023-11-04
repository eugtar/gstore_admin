"use client";

import CellAction from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export { columns };
