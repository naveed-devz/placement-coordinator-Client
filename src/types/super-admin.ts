import type { LucideIcon } from "lucide-react";

export type SuperAdminNavLabel =
  | "Dashboard"
  | "Organizations"
  | "Requests"
  | "Users"
  | "Plans"
  | "Analytics"
  | "Support"
  | "Audit Logs"
  | "Settings";

export type SuperAdminNavItem = {
  label: SuperAdminNavLabel;
  icon: LucideIcon;
};

export type OrganizationRow = {
  id: string;
  name: string;
  plan: string;
  status: string;
  students: number;
  coordinators: number;
  usage: number;
  region: string;
};

export type OrganizationRequest = {
  id: string;
  name: string;
  contact: string;
  requestedPlan: string;
  status: string;
  submitted: string;
};

export type PlatformUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  status: string;
};

export type SupportTicket = {
  id: string;
  title: string;
  organization: string;
  priority: string;
  status: string;
};
