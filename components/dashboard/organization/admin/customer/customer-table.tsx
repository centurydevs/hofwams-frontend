"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui";
import { useCustomerColumns } from "./customer-column";

import { Customer } from "@/types";

const data: Customer[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "+1234567890",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    phoneNumber: "+1987654321",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@example.com",
    phoneNumber: "+1122334455",
    createdAt: new Date("2023-03-25"),
  },
  {
    id: "4",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    phoneNumber: "+1234567890",
    createdAt: new Date("2023-01-15"),
  },
];

export const CustomerTable = () => {
  const columns = useCustomerColumns();

  return (
    <Card className="p-6">
      <DataTable
        columns={columns}
        data={data}
        title="Customers"
        description="Manage your customer base here."
      />
    </Card>
  );
};
