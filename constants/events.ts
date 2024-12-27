import { addDays, format } from "date-fns";
import { EventRequest, EventStatus } from "@/types";

export const eventReq: EventRequest[] = [
  {
    id: "0c307b6d-ccc6-4c61-ac31-3eda541cc621",
    name: "Jamie Mason",
    email: "eric30@gmail.com",
    eventType: "Webinar",
    date: "2024-05-10T01:13:22",
    status: "rejected",
  },
  {
    id: "02169caa-a109-49d9-884f-60f3ecc65235",
    name: "Rebecca Bender",
    email: "mckenzie70@yahoo.com",
    eventType: "Workshop",
    date: "2024-06-20T21:49:29",
    status: "accepted",
  },
  {
    id: "e64826a6-8d9d-40f4-b636-221994b6b57b",
    name: "Brittany Reed",
    email: "lindseystanley@yahoo.com",
    eventType: "Conference",
    date: "2024-08-09T16:24:40",
    status: "rejected",
  },
  {
    id: "a7b21cea-52f2-4cc7-ad20-cfe0d88b53de",
    name: "Timothy Flores",
    email: "whitakerkristina@lane.org",
    eventType: "Meeting",
    date: "2024-10-19T04:20:06",
    status: "rejected",
  },
  {
    id: "649d2e99-5560-4743-84a5-a9dfdbe663bf",
    name: "Renee Harrington",
    email: "connerjaime@yahoo.com",
    eventType: "Webinar",
    date: "2024-11-19T06:59:05",
    status: "pending",
  },
  {
    id: "34297b8e-20b1-4247-bca0-f4913c09a83d",
    name: "Christy Brown",
    email: "ewingpatricia@gmail.com",
    eventType: "Workshop",
    date: "2024-03-26T18:45:07",
    status: "accepted",
  },
  {
    id: "eeb016d4-c1c3-41f2-870e-af21419e00ac",
    name: "Joshua Collins",
    email: "jgonzalez@gmail.com",
    eventType: "Workshop",
    date: "2024-11-28T00:42:58",
    status: "accepted",
  },
  {
    id: "e7ba8827-1470-4e90-9ca1-ec8862380f9e",
    name: "Jennifer Anderson",
    email: "john59@wallace-blair.biz",
    eventType: "Meeting",
    date: "2024-05-30T09:47:39",
    status: "rejected",
  },
  {
    id: "54658093-a9de-4b82-8cec-c98b7fb37d0f",
    name: "David Hunt",
    email: "inewman@wells.org",
    eventType: "Meeting",
    date: "2024-03-21T08:47:14",
    status: "pending",
  },
  {
    id: "3b118dfc-2b8e-4874-8522-53fd417b40ee",
    name: "Robert Lawson",
    email: "herreraheather@gonzalez-smith.com",
    eventType: "Conference",
    date: "2024-03-08T22:43:47",
    status: "rejected",
  },
];

export const events = Array.from({ length: 5 }, (_, i) => ({
  id: i.toString(),
  name: "Tade Taylor",
  email: "Tade@gmail.com",
  eventType: "Anniversary",
  date: format(addDays(new Date(), i), "dd MMM yyyy"),
  time: "2 pm",
  status: (i % 2 === 0 ? "Event Request" : "Upcoming event") as EventStatus,
}));