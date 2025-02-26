import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      toast.success("Reset email sent!", {
        description: "Please check your inbox to reset your password",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Password reset failed:", error);

      // Get Firebase error code
      const errorCode =
        error instanceof Error && "code" in error
          ? (error as { code: string }).code
          : "";

      // Show specific error messages based on Firebase error codes
      switch (errorCode) {
        case "auth/user-not-found":
          toast.error("Account not found", {
            description: "No account exists with this email address",
          });
          break;
        case "auth/invalid-email":
          toast.error("Invalid email", {
            description: "Please enter a valid email address",
          });
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts", {
            description: "Please try again later",
          });
          break;
        default:
          toast.error("Failed to send reset email", {
            description:
              error instanceof Error ? error.message : "Please try again",
          });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md mt-16">
          <CardContent className="pt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-center">
                Reset your password
              </h2>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Email</p>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending reset link..." : "Send reset link"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p>
                Remember your password?{" "}
                <Link to="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
