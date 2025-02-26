import {
  LayoutDashboard,
  Settings,
  UserCircle,
  FileText,
  Calendar,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
] as const; 