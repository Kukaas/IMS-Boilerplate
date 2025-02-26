import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './Pages/Private/Dashboard';
import SignIn from './Pages/Public/SignIn';
import Welcome from './Pages/Public/Welcome';
import SignUp from './Pages/Public/SignUp';
import VerifyEmail from "./Pages/Public/VerifyEmail";
import ForgotPassword from "./Pages/Public/ForgotPassword";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes - will redirect to dashboard if authenticated */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* New route for verify email */}
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
        <Toaster richColors closeButton position="top-center" />
      </AuthProvider>
    </Router>
  );
}

export default App;
