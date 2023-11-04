"use client";

import CellAction from "./cell-action";
import { ColumnDef } from "@tanstack/react-table";

export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
  billboardLabel: string;
};

const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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
