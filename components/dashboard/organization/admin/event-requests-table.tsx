"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge, Card } from "@/components/ui";
import { DataTable } from "@/components/dashboard/data-table";

import { EventRequest } from "@/types";

const columns: ColumnDef<EventRequest>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "eventType",
    header: "Event Type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "accepted"
              ? "default"
              : status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
];

interface EventsTableProps {
  data: EventRequest[];
  title?: string;
}

export function EventRequestTable({ data, title }: EventsTableProps) {
  return (
    <Card className="p-6 max-w-[100vw]">
      <DataTable columns={columns} data={data} dateField="date" title={title} />
    </Card>
  );
}
