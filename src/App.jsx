import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage"; 
import QuoteRequestPage from "./pages/QuoteRequestPage"; 
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/Dashboard";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Security Wrapper for Role-Based Access Control
const ProtectedRoute = ({ children, requireAdmin = false, redirectAdmin = false }) => {
  const tokenData = JSON.parse(localStorage.getItem("token") || "null");
  
  // 1. Not logged in? Kick them to the auth page.
  if (!tokenData || !tokenData.token) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Logged in, but trying to access an admin route without admin privileges? Kick them to the customer dashboard.
  if (requireAdmin && tokenData.user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. THE FIX: Logged in as Admin, but trying to access customer dashboard? Kick them to Admin dashboard.
  if (redirectAdmin && tokenData.user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function AppContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Navbar based on whether we are in the Admin Panel or not */}
      <Routes>
        <Route path="/admin/*" element={null} /> 
        <Route path="*" element={<Navbar />} />
      </Routes>

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/tedaviler" element={<ProductsPage />} />
          <Route path="/randevu" element={<QuoteRequestPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/iletisim" element={<ContactPage />} />

          {/* Legacy URLs keep existing shared links from breaking. */}
          <Route path="/about" element={<Navigate to="/hakkimizda" replace />} />
          <Route path="/menu" element={<Navigate to="/tedaviler" replace />} />
          <Route path="/rezervasyon" element={<Navigate to="/randevu" replace />} />
          <Route path="/contact" element={<Navigate to="/iletisim" replace />} />

          {/* Customer Protected Route - Notice the new redirectAdmin={true} */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute redirectAdmin={true}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Admin Protected Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {/* Conditionally render Footer based on whether we are in the Admin Panel or not */}
      <Routes>
        <Route path="/admin/*" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
