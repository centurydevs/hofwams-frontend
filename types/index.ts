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
