import { ReactNode } from "react";

export type EventRequest = {
  id: string;
  name: string;
  email: string;
  eventType: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
};

export type Event = {
  id: string;
  name: string;
  email: string;
  eventType: string;
  date: string;
  time: string;
  status: EventStatus;
};

export type EventStatus = "Event Request" | "Upcoming event";

export type EventsTableProps = {
  data: Event[];
};

export type DashboardStats = {
  totalCustomers: number;
  totalEvents: number;
};

export type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  submenu?: NavItem[];
};

export type OrgDashboardLayoutProps = {
  children: ReactNode;
  params: { organization: string };
};

export enum UserRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: TokenPair;
}

export enum AuthMethod {
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
  OTP = "OTP",
  GOOGLE = "GOOGLE",
}

export interface LoginOptions {
  method: AuthMethod;
  email: string;
  password?: string;
  otp?: string;
  googleToken?: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface EventDetails {
  id: string;
  name: string;
  description: string;
  bannerUrl?: string;
  hashTag?: string;
  maxNumberOfAttendees: number;
  inviteOnly: boolean;
  maxNumberOfExtraGuest?: number;
  availableSlot?: number;
  slotTaken: number;
  allowMinors: boolean;
  meals: string[];
  drinks: string[];
  eventType: string;
  startDate: Date;
  eventOwnerName: string;
  endDate: Date;
  timezone: string;
  location: string;
  locationLatitude: number;
  locationLongitude: number;
  status: Status;
  guests: EventRegistrationDto[]; // Add this line
}

export enum Status {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

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

export type FieldValue = string | number | boolean | Date | string[];

export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "active" | "inactive";
}

export type MeasuringUnit = {
  name: string;
};

export type IngredientType = {
  id: string;
  name: string;
  purchaseDate: Date;
  expiryDate: Date;
  availableQuantity: number;
  unitName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IngredientUsageType = {
  id: string;
  ingredientName: string;
  assignedQuantity: number;
  quantityUsed: number | null;
  unitName: string;
  createdAt: Date;
  updatedAt: Date;
};
