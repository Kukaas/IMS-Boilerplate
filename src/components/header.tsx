import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="font-semibold ml-4">
          Google OAuth
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2 mr-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
} 