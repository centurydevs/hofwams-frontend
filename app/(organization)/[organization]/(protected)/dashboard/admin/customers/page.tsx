"use client";

import { useState } from "react";
import { Users, DollarSign, ShoppingCart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { CustomerTable } from "@/components/dashboard/organization/admin";

import { Customer } from "@/types";

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "+1234567890",
    company: "Tech Solutions Inc.",
    totalOrders: 15,
    totalSpent: 2500.0,
    lastOrderDate: "2023-06-15",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phoneNumber: "+1987654321",
    company: "Marketing Pros LLC",
    totalOrders: 8,
    totalSpent: 1200.0,
    lastOrderDate: "2023-05-20",
    status: "inactive",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phoneNumber: "+1122334455",
    company: "Design Masters Co.",
    totalOrders: 22,
    totalSpent: 3800.0,
    lastOrderDate: "2023-06-18",
    status: "active",
  },
  // Add more mock customers as needed
];

export default function CustomersPage() {
  const [customers] = useState(mockCustomers);

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );
  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.totalOrders,
    0
  );

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Customer Management</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
}
