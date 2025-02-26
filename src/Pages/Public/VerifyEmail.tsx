import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
  const { currentUser, isEmailVerified, sendVerificationEmail, logout } =
    useAuth();
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    // Check email verification status every 5 seconds
    const interval = setInterval(async () => {
      try {
        // Reload the user to get fresh status
        await currentUser.reload();
        if (currentUser.emailVerified) {
          toast.success("Email verified successfully!");
          navigate("/signin");
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Failed to check verification status:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (isEmailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await sendVerificationEmail();
    } catch (error) {
      toast.error("Failed to resend verification email", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-center">
              Verify your email
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              We've sent a verification email to {currentUser.email}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-center text-sm text-muted-foreground">
              Please check your email and click the verification link to
              continue. Don't forget to check your spam folder.
            </p>
            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend verification email"}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" onClick={() => logout()}>
              Sign out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
