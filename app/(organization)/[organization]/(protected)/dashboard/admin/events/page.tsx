import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EventRequestTable } from "@/components/dashboard/organization/admin";
import { EventsTable } from "@/components/dashboard/organization/common";

import { eventReq, events } from "@/constants/events";

const EventsPage = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Events</h2>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="requests">Event requests</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <EventsTable data={events} />
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4">
            <EventsTable
              data={events.filter((event) => event.status === "Upcoming event")}
            />
          </TabsContent>
          <TabsContent value="requests" className="space-y-4">
            <EventRequestTable data={eventReq} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;
