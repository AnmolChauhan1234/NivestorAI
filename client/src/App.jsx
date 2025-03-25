import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProfileSetup from "./components/ProfileSetup";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Main content area with sidebar, fixed at 100vh */}
        <div className="flex h-screen">
          <Sidebar onToggle={setSidebarExpanded} />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileSetup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
        {/* Footer appears below after scrolling */}
        <Footer sidebarExpanded={sidebarExpanded} />
      </div>
    </Router>
  );
}

export default App;
