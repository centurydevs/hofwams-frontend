"use client";

import { format } from "date-fns";
import {
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
  UtensilsIcon,
  WineIcon,
  HashIcon,
  ClockIcon,
  TicketIcon,
  UserPlusIcon,
  BabyIcon,
} from "lucide-react";
import Image from "next/image";
import { useOptimistic } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { InlineEdit } from "@/components/common/inline-edit";
import { Combobox } from "@/components/ui/combobox";
import { GuestList } from "./guest-list";

import { EventDetails, FieldValue, Status } from "@/types";

interface EventDetailsProps {
  event: EventDetails;
  onUpdate: (field: string, value: FieldValue) => Promise<void>;
}

export function EventDetailsComponent({
  event: initialEvent,
  onUpdate,
}: EventDetailsProps) {
  const [optimisticEvent, setOptimisticEvent] = useOptimistic(
    initialEvent,
    (state, newState: Partial<EventDetails>) => ({
      ...state,
      ...newState,
      meals: Array.isArray(newState.meals) ? newState.meals : state.meals,
      drinks: Array.isArray(newState.drinks) ? newState.drinks : state.drinks,
    })
  );

  const handleUpdate = async (field: string, value: FieldValue) => {
    setOptimisticEvent({ [field]: value });
    await onUpdate(field, value);
  };

  // Mock data for meals and drinks
  const mealOptions = [
    { value: "Continental Breakfast", label: "Continental Breakfast" },
    { value: "Gourmet Lunch Buffet", label: "Gourmet Lunch Buffet" },
    { value: "Networking Dinner", label: "Networking Dinner" },
    { value: "Vegan Option", label: "Vegan Option" },
  ];

  const drinkOptions = [
    { value: "Freshly Brewed Coffee", label: "Freshly Brewed Coffee" },
    { value: "Assorted Teas", label: "Assorted Teas" },
    { value: "Fruit-Infused Water", label: "Fruit-Infused Water" },
    { value: "Evening Cocktails", label: "Evening Cocktails" },
  ];

  return (
    <div className="space-y-8">
      <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg">
        {optimisticEvent.bannerUrl ? (
          <Image
            src={optimisticEvent.bannerUrl}
            alt={optimisticEvent.name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20">
            <span className="text-3xl font-semibold text-primary">
              {optimisticEvent.name}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-3xl font-bold text-white">
            <InlineEdit
              value={optimisticEvent.name}
              onSave={(value) => handleUpdate("name", value)}
            />
          </h1>
          <p className="mt-2 text-lg text-white/80">
            <InlineEdit
              value={optimisticEvent.description}
              onSave={(value) => handleUpdate("description", value)}
            />
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Badge
          className="text-lg px-3 py-1"
          variant={
            optimisticEvent.status === Status.PUBLISHED
              ? "default"
              : "secondary"
          }
        >
          {optimisticEvent.status}
        </Badge>
        {optimisticEvent.hashTag && (
          <Badge variant="outline" className="text-lg px-3 py-1">
            <HashIcon className="mr-2 h-4 w-4" />
            <InlineEdit
              value={optimisticEvent.hashTag}
              onSave={(value) => handleUpdate("hashTag", value)}
            />
          </Badge>
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="overflow-hidden col-span-2 lg:col-span-1">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span>
                <InlineEdit
                  value={format(new Date(optimisticEvent.startDate), "PPP")}
                  onSave={(value) => handleUpdate("startDate", new Date(value))}
                />
                {" - "}
                <InlineEdit
                  value={format(new Date(optimisticEvent.endDate), "PPP")}
                  onSave={(value) => handleUpdate("endDate", new Date(value))}
                />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-muted-foreground" />
              <InlineEdit
                value={optimisticEvent.timezone}
                onSave={(value) => handleUpdate("timezone", value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-muted-foreground" />
              <InlineEdit
                value={optimisticEvent.location}
                onSave={(value) => handleUpdate("location", value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              <span>
                Organized by{" "}
                <InlineEdit
                  value={optimisticEvent.eventOwnerName}
                  onSave={(value) => handleUpdate("eventOwnerName", value)}
                />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden col-span-2 lg:col-span-1">
          <CardHeader className="bg-secondary/10">
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-muted-foreground" />
                Max Attendees:
              </span>
              <Badge variant="outline">
                <InlineEdit
                  value={optimisticEvent.maxNumberOfAttendees.toString()}
                  onSave={(value) =>
                    handleUpdate("maxNumberOfAttendees", parseInt(value))
                  }
                />
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-muted-foreground" />
                Slots Taken:
              </span>
              <Badge variant="outline">
                <InlineEdit
                  value={optimisticEvent.slotTaken.toString()}
                  onSave={(value) => handleUpdate("slotTaken", parseInt(value))}
                />
              </Badge>
            </div>
            {optimisticEvent.availableSlot !== undefined && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TicketIcon className="h-5 w-5 text-muted-foreground" />
                  Available Slots:
                </span>
                <Badge variant="outline">
                  <InlineEdit
                    value={optimisticEvent.availableSlot.toString()}
                    onSave={(value) =>
                      handleUpdate("availableSlot", parseInt(value))
                    }
                  />
                </Badge>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UserPlusIcon className="h-5 w-5 text-muted-foreground" />
                Invite Only:
              </span>
              <Badge
                variant={optimisticEvent.inviteOnly ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() =>
                  handleUpdate("inviteOnly", !optimisticEvent.inviteOnly)
                }
              >
                {optimisticEvent.inviteOnly ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BabyIcon className="h-5 w-5 text-muted-foreground" />
                Allow Minors:
              </span>
              <Badge
                variant={optimisticEvent.allowMinors ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() =>
                  handleUpdate("allowMinors", !optimisticEvent.allowMinors)
                }
              >
                {optimisticEvent.allowMinors ? "Yes" : "No"}
              </Badge>
            </div>
            {optimisticEvent.maxNumberOfExtraGuest !== undefined && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <UserPlusIcon className="h-5 w-5 text-muted-foreground" />
                  Max Extra Guests:
                </span>
                <Badge variant="outline">
                  <InlineEdit
                    value={optimisticEvent.maxNumberOfExtraGuest.toString()}
                    onSave={(value) =>
                      handleUpdate("maxNumberOfExtraGuest", parseInt(value))
                    }
                  />
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden col-span-2">
          <CardHeader className="bg-accent/10">
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px] w-full overflow-hidden">
              <MapContainer
                center={[
                  optimisticEvent.locationLatitude,
                  optimisticEvent.locationLongitude,
                ]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    optimisticEvent.locationLatitude,
                    optimisticEvent.locationLongitude,
                  ]}
                >
                  <Popup>{optimisticEvent.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden col-span-2">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center gap-2">
              <UtensilsIcon className="h-5 w-5" />
              Menu
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-2">
                <UtensilsIcon className="h-5 w-5 text-primary" />
                Meals
              </h3>
              <div className="space-y-2">
                {(optimisticEvent.meals || []).map((meal, index) => (
                  <Combobox
                    key={index}
                    options={mealOptions}
                    value={meal}
                    onChange={(value) => {
                      const newMeals = [...(optimisticEvent.meals || [])];
                      newMeals[index] = value;
                      handleUpdate("meals", newMeals);
                    }}
                    placeholder="Select a meal"
                  />
                ))}
                <Combobox
                  options={mealOptions}
                  value=""
                  onChange={(value) => {
                    if (value) {
                      handleUpdate("meals", [
                        ...(optimisticEvent.meals || []),
                        value,
                      ]);
                    }
                  }}
                  placeholder="Add a meal"
                />
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-2">
                <WineIcon className="h-5 w-5 text-primary" />
                Drinks
              </h3>
              <div className="space-y-2">
                {(optimisticEvent.drinks || []).map((drink, index) => (
                  <Combobox
                    key={index}
                    options={drinkOptions}
                    value={drink}
                    onChange={(value) => {
                      const newDrinks = [...(optimisticEvent.drinks || [])];
                      newDrinks[index] = value;
                      handleUpdate("drinks", newDrinks);
                    }}
                    placeholder="Select a drink"
                  />
                ))}
                <Combobox
                  options={drinkOptions}
                  value=""
                  onChange={(value) => {
                    if (value) {
                      handleUpdate("drinks", [
                        ...(optimisticEvent.drinks || []),
                        value,
                      ]);
                    }
                  }}
                  placeholder="Add a drink"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden col-span-2">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Registered Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GuestList guests={optimisticEvent.guests} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
