"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";

import { Button, Card } from "@/components/ui";
import { DataTable } from "@/components/dashboard/data-table";

import { Event } from "@/types";

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("name")}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "eventType",
    header: "Event",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Action",
    cell: () => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export function EventsTable({
  data,
  title,
}: {
  data: Event[];
  title?: string;
}) {
  return (
    <Card className="p-6 max-w-[100vw]">
      <DataTable columns={columns} data={data} dateField="date" title={title} />
    </Card>
  );
}
