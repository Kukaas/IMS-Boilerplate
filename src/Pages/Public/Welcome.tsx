import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="container flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Google OAuth
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            A minimalist platform designed to help you achieve your goals. 
            Get started in seconds.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/signin">
                Sign in
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
