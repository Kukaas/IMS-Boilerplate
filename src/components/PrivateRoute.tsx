import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { currentUser, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to sign in if not authenticated
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
