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
import Calendar from "./Pages/Private/Calendar";
import Documents from "./Pages/Private/Documents";
import Setting from "./Pages/Private/Setting";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeProvider>
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
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<Setting />} />
            </Route>

            {/* New route for verify email */}
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
          <Toaster richColors closeButton position="top-center" />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
