"use client";

import { useState } from "react";
import Link from "next/link";
import {
  EventDetails,
  EventRegistrationDto,
  FieldValue,
  Status,
} from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ToastMessage } from "@/components/common";
import { EventDetailsComponent } from "@/components/dashboard/events/event-details";

// Mock guest data
const mockGuests: EventRegistrationDto[] = [
  {
    firstName: "John",
    lastName: "Doe",
    eventId: "1",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    age: 30,
    nationality: "USA",
    comingWithExtra: true,
    numberOfExtra: 2,
    numberOfAdults: 1,
    numberOfMinors: 1,
    extraType: "FAMILY",
    preferredDishes: ["Steak", "Salad"],
    preferredDrinks: ["Red Wine", "Water"],
    dietary: ["Gluten-free"],
    allergies: ["Nuts"],
    mealSize: "MEDIUM",
    guestCountValid: true,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    eventId: "1",
    email: "jane.smith@example.com",
    phoneNumber: "+1987654321",
    age: 28,
    nationality: "Canada",
    comingWithExtra: false,
    preferredDishes: ["Vegetarian Pasta"],
    preferredDrinks: ["White Wine", "Juice"],
    dietary: ["Vegetarian"],
    allergies: [],
    mealSize: "SMALL",
    guestCountValid: true,
  },
  // Add more mock guests as needed
];

// This is a mock function to simulate fetching event details
// In a real application, you would fetch this data from your API
function getEventDetails(id: string): EventDetails {
  return {
    id,
    name: "Annual Tech Conference 2024",
    description:
      "Join us for the biggest tech conference of the year, featuring keynotes from industry leaders and hands-on workshops.",
    bannerUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    hashTag: "#TechConf2024",
    maxNumberOfAttendees: 1000,
    inviteOnly: false,
    maxNumberOfExtraGuest: 2,
    availableSlot: 250,
    slotTaken: 750,
    allowMinors: false,
    meals: [
      "Continental Breakfast",
      "Gourmet Lunch Buffet",
      "Networking Dinner",
    ],
    drinks: [
      "Freshly Brewed Coffee",
      "Assorted Teas",
      "Fruit-Infused Water",
      "Evening Cocktails",
    ],
    eventType: "Conference",
    startDate: new Date("2024-09-15T09:00:00Z"),
    eventOwnerName: "TechCorp Inc.",
    endDate: new Date("2024-09-17T18:00:00Z"),
    timezone: "America/New_York",
    location: "New York Convention Center",
    locationLatitude: 40.7128,
    locationLongitude: -74.006,
    status: Status.PUBLISHED,
    guests: mockGuests,
  };
}

export default function EventPage({ params }: { params: { id: string } }) {
  const [eventDetails, setEventDetails] = useState(getEventDetails(params.id));

  const handleUpdate = async (field: string, value: FieldValue) => {
    // In a real application, you would make an API call here
    // For now, we'll just update the state
    setEventDetails((prev) => ({ ...prev, [field]: value }));

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success(
      <ToastMessage
        title="Event updated"
        details={`${field} has been updated successfully.`}
      />
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/events">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
      <EventDetailsComponent event={eventDetails} onUpdate={handleUpdate} />
    </div>
  );
}
