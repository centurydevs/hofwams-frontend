import { StatsCards } from "@/components/dashboard/organization/admin";
import { ProtectedRoute } from "@/components/common/protected-route";
import { UserRole } from "@/types";
import { events } from "@/constants/events";
import { EventsTable } from "@/components/dashboard/organization/common";

// Demo data
const stats = {
  totalCustomers: 2900,
  totalEvents: 2400,
};

export default function StaffDashboardPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.STAFF}>
      <div className="space-y-6">
        <StatsCards stats={stats} />
        <div className="grid gap-6 md:grid-cols-2">
          <EventsTable data={events} title="Upcoming Events" />
        </div>
      </div>
    </ProtectedRoute>
  );
}
