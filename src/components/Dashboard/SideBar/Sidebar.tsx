import { useState, useEffect } from "react";
import { logOut } from "../../../redux/features/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../../redux/features/user/userApi";
import { useCurrentToken } from "../../../redux/features/Auth/AuthSlice";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { roleLinks } from "./sidebarlinks";
type Role = "Admin" | "Vendor" | "Customer";

const Sidebar = () => {
  const [role, setRole] = useState<Role>("Customer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  // Update role when user data is available
  useEffect(() => {
    if (user) {
      setRole(user.role as Role);
    }
  }, [user]);

  // Handle resizing for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Links based on role
  const links = roleLinks[role] || roleLinks.Customer;

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-purple-600 p-2 rounded-md text-white"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} ${
          isMobile ? "fixed" : "relative"
        } lg:translate-x-0 w-64 bg-purple-600 text-white p-4 space-y-6 transition-transform duration-300 h-full z-40`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My App</h2>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          {user && (
            <>
              <img
                src={user.profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
              />
              <span className="text-white font-semibold">{user.name}</span>
            </>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="space-y-4">
          {links.map((link) => (
            <Link
              to={link.link}
              className="text-white hover:bg-gray-700 px-4 py-2 rounded-md block flex items-center space-x-3"
              key={link.name}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogOut}
            className="text-white flex items-center space-x-2 px-4 py-2 rounded-md mt-4 hover:bg-gray-700 w-full"
          >
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
    </div>
  );
};

export default Sidebar;
