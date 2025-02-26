import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute() {
  const { loading, isAuthenticated } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to dashboard if already authenticated
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
} 