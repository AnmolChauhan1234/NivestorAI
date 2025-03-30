import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSetup from "./components/ProfileSetup";
import Sidebar from "./components/Sidebar";
import Briefing from "./Pages/Briefing";
import PostDayAnalysis from "./Pages/PostDayAnalysis";
import Dashboard from "./Pages/Dashboard";
import Watchlist from "./Pages/Watchlist";
import Profile from "./Pages/Profile";
import AIChatDashboard from "./components/AIChatDashboard";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

const AuthRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex">
          
          <Sidebar onToggle={setSidebarExpanded} />

          <div
            className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${
              sidebarExpanded && sessionStorage.getItem("token")
                ? "md:ml-64"
                : sessionStorage.getItem("token")
                ? "md:ml-16"
                : "ml-0"
            }`}
            style={{ minHeight: "calc(100vh - 80px)" }}
          >
            <Routes>
              {/* Auth Routes - only accessible when logged out */}
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRoute>
                    <Signup />
                  </AuthRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <ProfileSetup />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - only accessible when logged in */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/aichat"
                element={
                  <ProtectedRoute>
                    <AIChatDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/briefing"
                element={
                  <ProtectedRoute>
                    <Briefing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analysis"
                element={
                  <ProtectedRoute>
                    <PostDayAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route */}
              <Route
                path="*"
                element={
                  sessionStorage.getItem("token") ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
