import {
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Users,
  Cake,
  Utensils,
  Wine,
} from "lucide-react";
import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export interface EventRegistrationDto {
  firstName: string;
  eventId: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  nationality: string;
  comingWithExtra: boolean;
  numberOfExtra?: number;
  numberOfAdults?: number;
  numberOfMinors?: number;
  extraType?: "FAMILY" | "FRIENDS" | "COLLEAGUES";
  preferredDishes: string[];
  preferredDrinks: string[];
  dietary: string[];
  allergies: string[];
  mealSize: "SMALL" | "MEDIUM" | "LARGE";
  guestCountValid: boolean;
}

interface GuestListProps {
  guests: EventRegistrationDto[];
}

export function GuestList({ guests }: GuestListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGuests, setFilteredGuests] = useState(guests);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = guests.filter(
      (guest) =>
        guest.firstName.toLowerCase().includes(term) ||
        guest.lastName.toLowerCase().includes(term) ||
        guest.email.toLowerCase().includes(term)
    );
    setFilteredGuests(filtered);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center mt-4">
        <h2 className="text-2xl font-bold">Guest List</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search guests..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Extra Guests</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest, index) => (
              <TableRow key={index}>
                <TableCell>{`${guest.firstName} ${guest.lastName}`}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>{guest.phoneNumber}</TableCell>
                <TableCell>
                  {guest.comingWithExtra ? (
                    <Badge variant="secondary">
                      {guest.numberOfExtra || 0}
                    </Badge>
                  ) : (
                    <Badge variant="outline">None</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          Guest Details
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[80vh] overflow-auto">
                        <div className="grid gap-6 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20">
                                  <AvatarFallback className="text-2xl">
                                    {guest.firstName[0]}
                                    {guest.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xl font-semibold">{`${guest.firstName} ${guest.lastName}`}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {guest.nationality}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{guest.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{guest.phoneNumber}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Cake className="h-4 w-4 text-muted-foreground" />
                                <span>{guest.age} years old</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Guest Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <p>
                                Coming with extra guests:{" "}
                                {guest.comingWithExtra ? "Yes" : "No"}
                              </p>
                              {guest.comingWithExtra && (
                                <>
                                  <p>
                                    Number of extra guests:{" "}
                                    {guest.numberOfExtra}
                                  </p>
                                  <p>Adults: {guest.numberOfAdults}</p>
                                  <p>Minors: {guest.numberOfMinors}</p>
                                  <p>Extra type: {guest.extraType}</p>
                                </>
                              )}
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Utensils className="h-5 w-5" />
                                Dietary Preferences
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <p>Meal size: {guest.mealSize}</p>
                              <div>
                                <p className="font-semibold">
                                  Dietary restrictions:
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {guest.dietary.map((diet, index) => (
                                    <Badge key={index} variant="secondary">
                                      {diet}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold">Allergies:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {guest.allergies.map((allergy, index) => (
                                    <Badge key={index} variant="destructive">
                                      {allergy}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Wine className="h-5 w-5" />
                                Preferences
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div>
                                <p className="font-semibold">
                                  Preferred Dishes:
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {guest.preferredDishes.map((dish, index) => (
                                    <Badge key={index} variant="outline">
                                      {dish}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="font-semibold">
                                  Preferred Drinks:
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {guest.preferredDrinks.map((drink, index) => (
                                    <Badge key={index} variant="outline">
                                      {drink}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
