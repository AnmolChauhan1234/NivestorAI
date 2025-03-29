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
import Footer from "./components/Footer";

// New Pages
import Briefing from "./Pages/Briefing";
import PostDayAnalysis from "./Pages/PostDayAnalysis";
import Dashboard from "./Pages/Dashboard";
import Watchlist from "./Pages/Watchlist";
import Profile from "./Pages/Profile";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
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
              sidebarExpanded ? "md:ml-64" : "md:ml-16"
            }`}
            style={{ minHeight: "calc(100vh - 80px)" }} // Adjust based on your footer height
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/settings" element={<ProfileSetup />} />

              {/* Protected Routes */}

              <Route
                path="/profile"
                element={
                  // <ProtectedRoute>
                    <Profile />
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                    <Dashboard />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/briefing"
                element={
                  // <ProtectedRoute>
                    <Briefing />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/analysis"
                element={
                  // <ProtectedRoute>
                    <PostDayAnalysis />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  // <ProtectedRoute>
                    <Watchlist />
                  // </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>

        {/* <Footer sidebarExpanded={sidebarExpanded} /> */}
      </div>
    </Router>
  );
}

export default App;
