import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  LayoutDashboard,
  User,
  Settings,
  BarChart,
  LogOut,
  LogIn,
  FileText,
  ClipboardList,
  Heart,
  MessageSquare,
} from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, onToggle }) {
  const [expanded, setExpanded] = useState(true);
  const [hasUnreadBriefing, setHasUnreadBriefing] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userName = token ? "John Doe" : "";
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";
  const email = token ? "johndoe@gmail.com" : "";

  // Set unread briefing when user logs in
  useEffect(() => {
    if (token) {
      setHasUnreadBriefing(true);
    }
  }, [token]);

  const collapseSidebar = () => setExpanded(false);

  const handleToggle = () => {
    setExpanded((curr) => !curr);
    if (onToggle) onToggle(!expanded);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("token");
        alert(data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        alert("Logout Error!! Taking you back to login.");
        sessionStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      sessionStorage.removeItem("token");
      console.log(error);
      navigate("/");
    }
  };

  const handleBriefingClick = () => {
    setHasUnreadBriefing(false);
    navigate("/briefing");
    if (expanded && window.innerWidth < 768) collapseSidebar();
  };

  return (
    <>
      {/* Desktop/Tablet Sidebar (always full height) */}
      <aside className="hidden md:block fixed top-0 left-0 z-20 h-screen">
        <nav
          className={`h-full flex flex-col bg-white border-r border-gray-800 shadow-sm transition-all duration-300 ${
            expanded ? "w-64" : "w-16"
          }`}
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="NIVESTOR AI"
            />

            <button
              onClick={handleToggle}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded, collapseSidebar }}>
            <ul className={`flex-1 px-3 ${expanded ? "" : "md:block"}`}>
              <SidebarItem
                icon={<User size={20} />}
                text="Profile"
                to="/profile"
              />

              <SidebarItem
                icon={<Heart size={20} />}
                text="Watchlist"
                to="/watchlist"
              />

              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                to="/dashboard"
              />
              <SidebarItem
                icon={<MessageSquare size={20} />}
                text="AiChat"
                to="/aichat"
              />
              <SidebarItem
                icon={<FileText size={20} />}
                text="Briefing"
                alert={hasUnreadBriefing}
                onClick={handleBriefingClick}
              />
              <SidebarItem
                icon={<ClipboardList size={20} />}
                text="Post-Day Analysis"
                to="/analysis"
              />

              <SidebarItem
                icon={<Settings size={20} />}
                text="Settings"
                to="/settings"
              />
              {token ? (
                <SidebarItem
                  icon={<LogOut size={20} />}
                  text="Logout"
                  onClick={handleLogout}
                />
              ) : (
                <SidebarItem icon={<LogIn size={20} />} text="Login" to="/" />
              )}
            </ul>

            {token && (
              <div
                className={`border-t border-gray-800 flex p-3 ${
                  expanded ? "" : "md:flex hidden"
                }`}
              >
                <div className="w-10 h-10 rounded-md bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                  {initials}
                </div>
                <div
                  className={`flex justify-between items-center overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  <div className="leading-4">
                    <h4 className="font-semibold">{userName}</h4>
                    <span className="text-xs text-gray-600">{email}</span>
                  </div>
                  <MoreVertical size={20} className="cursor-pointer" />
                </div>
              </div>
            )}
          </SidebarContext.Provider>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside className="md:hidden fixed top-0 left-0 z-20">
        {expanded ? (
          <nav className="h-screen w-64 flex flex-col bg-white border-r border-gray-800 shadow-sm">
            <div className="p-4 pb-2 flex justify-between items-center">
              <img
                src="https://img.logoipsum.com/243.svg"
                className="w-32"
                alt=""
              />
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <ChevronFirst />
              </button>
            </div>

            <SidebarContext.Provider value={{ expanded, collapseSidebar }}>
              <ul className="flex-1 px-3">
                <SidebarItem
                  icon={<User size={20} />}
                  text="Profile"
                  to="/profile"
                />

                <SidebarItem
                  icon={<Heart size={20} />}
                  text="Watchlist"
                  to="/watchlist"
                />

                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  text="Dashboard"
                  to="/dashboard"
                />

                <SidebarItem
                  icon={<MessageSquare size={20} />}
                  text="AiChat"
                  to="/aichat"
                />

                <SidebarItem
                  icon={<FileText size={20} />}
                  text="Briefing"
                  alert={hasUnreadBriefing}
                  onClick={handleBriefingClick}
                />
                <SidebarItem
                  icon={<ClipboardList size={20} />}
                  text="Post-Day Analysis"
                  to="/analysis"
                />

                <SidebarItem
                  icon={<Settings size={20} />}
                  text="Settings"
                  to="/settings"
                />

                {token ? (
                  <SidebarItem
                    icon={<LogOut size={20} />}
                    text="Logout"
                    onClick={handleLogout}
                  />
                ) : (
                  <SidebarItem icon={<LogIn size={20} />} text="Login" to="/" />
                )}
              </ul>

              {token && (
                <div className="border-t border-gray-800 flex p-3">
                  <div className="w-10 h-10 rounded-md bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                    {initials}
                  </div>
                  <div className="flex justify-between items-center w-52 ml-3">
                    <div className="leading-4">
                      <h4 className="font-semibold">{userName}</h4>
                      <span className="text-xs text-gray-600">{email}</span>
                    </div>
                    <MoreVertical size={20} />
                  </div>
                </div>
              )}
            </SidebarContext.Provider>
          </nav>
        ) : (
          // Collapsed mobile - just the toggle button
          <button
            onClick={handleToggle}
            className="m-2 p-2 rounded-lg bg-white shadow-md hover:bg-gray-100"
          >
            <ChevronLast size={24} />
          </button>
        )}
      </aside>

      {/* Mobile overlay */}
      {expanded && (
        <div
          className="md:hidden fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm z-10"
          onClick={collapseSidebar}
        />
      )}
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, to, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    if (onClick) onClick();
  };

  return (
    <li
      onClick={handleClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "md:w-0 w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded-full bg-red-500" />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            md:block hidden
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
