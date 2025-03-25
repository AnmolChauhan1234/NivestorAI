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
} from "lucide-react";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, onToggle }) {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = token ? "John Doe" : "";
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";
  const email = token ? "johndoe@gmail.com" : "";

  const collapseSidebar = () => setExpanded(false);

  const handleToggle = () => {
    setExpanded((curr) => !curr);
    if (onToggle) onToggle(!expanded);
  };

  return (
    <>
      <aside className="h-screen w-max fixed top-0 left-0 z-20">
        <nav
          className={`h-full flex flex-col bg-white border-r border-gray-800 shadow-sm transition-all duration-300 ${
            expanded ? "w-64" : "w-16 md:w-16"
          }`}
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={handleToggle}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded, collapseSidebar }}>
            <ul className={`flex-1 px-3 ${expanded ? "" : "md:block hidden"}`}>
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                to="/dashboard"
              />
              <SidebarItem
                icon={<User size={20} />}
                text="Profile"
                to="/profile"
              />
              <SidebarItem icon={<Settings size={20} />} text="Settings" />
              <SidebarItem icon={<BarChart size={20} />} text="Analytics" />
              {token ? (
                <SidebarItem
                  icon={<LogOut size={20} />}
                  text="Logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                />
              ) : (
                <SidebarItem icon={<LogIn size={20} />} text="Login" to="/" />
              )}
            </ul>
          </SidebarContext.Provider>

          {token && (
            <div
              className={`border-t border-gray-800 flex p-3 ${
                expanded ? "" : "md:block hidden"
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
                <MoreVertical size={20} />
              </div>
            </div>
          )}
        </nav>
      </aside>
      {expanded && (
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-sm z-10 md:hidden"
          onClick={collapseSidebar}
        />
      )}
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, to, onClick }) {
  const { expanded, collapseSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    if (onClick) onClick();
    if (expanded && window.innerWidth < 768) collapseSidebar();
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
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
