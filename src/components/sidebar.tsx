import { Link } from "react-router-dom";
import { sidebarLinks } from "@/config/sidebar";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "h-[calc(100vh-3.5rem)] w-78 sm:w-60 border-r bg-background",
        className
      )}
    >
      <div className="space-y-4 py-4">
        {/* Title - Only visible on mobile */}
        <div className="md:hidden px-3 py-2">
          <h2 className="text-lg font-semibold tracking-tight">Google OAuth</h2>
        </div>

        <div className="px-3 py-2">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
} 