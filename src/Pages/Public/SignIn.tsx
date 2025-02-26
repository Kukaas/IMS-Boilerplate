import { useAuth } from "@/contexts/AuthContext";

export default function SignIn() {
  const { signInWithGoogle } = useAuth();

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}
