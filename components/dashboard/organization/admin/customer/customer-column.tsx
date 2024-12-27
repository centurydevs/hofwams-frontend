import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo } from "react";

import { DataTableHeader } from "@/components/dashboard/data-table";

import { Customer } from "@/types";

export const useCustomerColumns = () => {
  return useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <DataTableHeader column={column} title="First Name" />
        ),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => (
          <DataTableHeader column={column} title="Last Name" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableHeader column={column} title="Email" />
        ),
      },
      {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
          <DataTableHeader column={column} title="Phone" />
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableHeader column={column} title="Created At" />
        ),
        cell: ({ row }) =>
          format(new Date(row.getValue("createdAt")), "dd/MM/yyyy"),
      },
    ],
    []
  );
};
