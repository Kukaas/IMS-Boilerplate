import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "sonner";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  isEmailVerified: boolean;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  isAuthenticated: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
  signUpWithEmail: async () => {},
  signInWithEmail: async () => {},
  sendVerificationEmail: async () => {},
  isEmailVerified: false,
  updateUserProfile: async () => {},
  resetPassword: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get the ID token
      const idToken = await result.user.getIdToken();

      // Send the token to your backend to set up the session cookie
      const response = await fetch(`${API_URL}/api/auth/session`, {
        method: "POST",
        credentials: "include", // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Google sign in failed:", error);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      // Clear session cookie through backend
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  async function sendVerificationEmail() {
    if (!currentUser) throw new Error("No user logged in");
    try {
      await sendEmailVerification(currentUser);
      toast.success("Verification email sent!", {
        description: "Please check your inbox and spam folder",
      });
    } catch (error) {
      console.error("Failed to send verification email:", error);
      throw error;
    }
  }

  async function updateUserProfile(data: {
    displayName?: string;
    photoURL?: string;
  }) {
    if (!currentUser) throw new Error("No user logged in");
    try {
      await updateProfile(currentUser, data);
      // Force refresh the user object
      setCurrentUser({ ...currentUser });
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", {
        description: "Please check your inbox and spam folder",
      });
    } catch (error) {
      console.error("Failed to send reset email:", error);
      throw error;
    }
  }

  async function signUpWithEmail(email: string, password: string, displayName?: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile if display name is provided
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      // Send verification email
      await sendEmailVerification(result.user);

      // Don't create session or set isAuthenticated
      // Just show success message
      toast.success("Account created successfully!", {
        description: "Please check your inbox to verify your email address",
      });
    } catch (error) {
      console.error("Email sign up failed:", error);
      throw error;
    }
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!result.user.emailVerified) {
        // Send them to verify email page instead of creating session
        throw new Error("Please verify your email before signing in");
      }

      const idToken = await result.user.getIdToken();

      const response = await fetch(`${API_URL}/api/auth/session`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Email sign in failed:", error);
      throw error;
    }
  }

  useEffect(() => {
    // Verify session status with backend
    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/api/auth/verify-session`, {
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkSession();
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    checkSession();
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout,
    isAuthenticated,
    signUpWithEmail,
    signInWithEmail,
    sendVerificationEmail,
    isEmailVerified: currentUser?.emailVerified ?? false,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 