import { Header } from "@/components/header";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const { signInWithGoogle, signInWithEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);

      // Get Firebase error code
      const errorCode =
        error instanceof Error && "code" in error
          ? (error as { code: string }).code
          : "";

      // Show specific error messages based on Firebase error codes
      switch (errorCode) {
        case "auth/invalid-credential":
          toast.error("Invalid credentials", {
            description: "The email or password you entered is incorrect",
          });
          break;
        case "auth/user-not-found":
          toast.error("Account not found", {
            description: "No account exists with this email address",
          });
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password", {
            description: "The password you entered is incorrect",
          });
          break;
        case "auth/invalid-email":
          toast.error("Invalid email", {
            description: "Please enter a valid email address",
          });
          break;
        case "auth/user-disabled":
          toast.error("Account disabled", {
            description: "This account has been disabled",
          });
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts", {
            description: "Please try again later or reset your password",
          });
          break;
        case "auth/network-request-failed":
          toast.error("Network error", {
            description: "Please check your internet connection",
          });
          break;
        default:
          if (
            error instanceof Error &&
            error.message.includes("verify your email")
          ) {
            toast.error("Email not verified", {
              description:
                "Please check your inbox and verify your email address",
            });
            navigate("/verify-email");
          } else {
            toast.error("Authentication error", {
              description:
                error instanceof Error ? error.message : "Please try again",
            });
          }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);
      toast.error("Failed to sign in with Google", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
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
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-4">
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

              <div className="space-y-2">
                <p className="text-sm font-medium">Password</p>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <div className="text-right">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs font-normal"
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign in with Google
            </Button>

            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
