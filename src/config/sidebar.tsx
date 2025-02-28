import {
  LayoutDashboard,
  Settings,
  UserCircle,
  FileText,
  Calendar,
  Package,
  Boxes,
  Truck,
  ClipboardList,
  BarChart,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Inventory",
    icon: Boxes,
    href: "/inventory",
  },
  {
    title: "Products",
    icon: Package,
    href: "/products",
  },
  {
    title: "Orders",
    icon: ClipboardList,
    href: "/orders",
  },
  {
    title: "Suppliers",
    icon: Truck,
    href: "/suppliers",
  },
  {
    title: "Reports",
    icon: BarChart,
    href: "/reports",
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