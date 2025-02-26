import { Link } from "react-router-dom";
import { sidebarLinks } from "@/config/sidebar";

export function Sidebar() {
  return (
    <div className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 