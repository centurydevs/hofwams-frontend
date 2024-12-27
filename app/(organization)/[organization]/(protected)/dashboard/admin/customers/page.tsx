"use client";

import {
  AnalyticsCards,
  CustomerCharts,
  CustomerTable,
} from "@/components/dashboard/organization/admin/customer";

export default function CustomersPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[100vw]">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Customer Data
        </h1>
        <p className="text-muted-foreground">
          Manage and monitor your customer data.
        </p>
      </div>

      <AnalyticsCards />
      <CustomerCharts />
      <CustomerTable />
    </div>
  );
}
