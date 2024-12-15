import { format, addDays } from "date-fns";
import {
  EventsTable,
  StatsCards,
} from "@/components/dashboard/organization/admin";
import { ProtectedRoute } from "@/components/common/protected-route";
import { UserRole } from "@/types";

// Demo data
const stats = {
  totalCustomers: 2900,
  totalEvents: 2400,
};

const demoEvents = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: "Tade Taylor",
  email: "tade@gmail.com",
  eventType: "Anniversary",
  date: format(addDays(new Date(), i), "dd MMM yyyy"),
  status:
    i % 3 === 0
      ? "accepted"
      : i % 3 === 1
      ? "rejected"
      : ("pending" as "accepted" | "rejected" | "pending"),
}));

export default function StaffDashboardPage() {
  return (
    <ProtectedRoute requiredRole={UserRole.STAFF}>
      <div className="space-y-6">
        <StatsCards stats={stats} />
        <div className="grid gap-6 md:grid-cols-2">
          <EventsTable data={demoEvents} title="Upcoming Events" />
          <EventsTable data={demoEvents} title="Event Requests" />
        </div>
      </div>
    </ProtectedRoute>
  );
}
