import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, User, Menu, LogOut, Settings, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { sidebarLinks } from "@/config/sidebar";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";

export function Header() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setShowProfileDialog(false);
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0">
                    <Sidebar />
                  </SheetContent>
                </Sheet>

                <Link to="/" className="font-semibold hidden md:block">
                  Google OAuth
                </Link>
              </>
            ) : (
              <Link to="/" className="font-semibold">
                Google OAuth
              </Link>
            )}
          </div>

          <div className="flex-1" />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.photoURL || ""} />
                      <AvatarFallback>
                        {currentUser?.displayName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {currentUser?.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setShowProfileDialog(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin">◌</span>
                        Logging out...
                      </>
                    ) : (
                      <>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={currentUser?.photoURL || ""} />
              <AvatarFallback className="text-2xl">
                {currentUser?.displayName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-xl font-semibold">
                {currentUser?.displayName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>
            <div className="flex gap-2 w-full">
              <Button className="flex-1" variant="outline">
                Edit Profile
              </Button>
              <Button className="flex-1">Share Profile</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 