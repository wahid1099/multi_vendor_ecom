import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [role, setRole] = useState("Customer"); // Default to Customer

  const renderSidebarLinks = () => {
    if (role === "Admin") {
      return (
        <>
          <Link
            to="/admin-dashboard"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Admin Dashboard
          </Link>
          <Link
            to="/manage-users"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Manage Users
          </Link>
          <Link
            to="/settings"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Settings
          </Link>
        </>
      );
    } else if (role === "Vendor") {
      return (
        <>
          <Link
            to="/vendor-dashboard"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Vendor Dashboard
          </Link>
          <Link
            to="/manage-products"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Manage Products
          </Link>
          <Link
            to="/orders"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Orders
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to="/customer-dashboard"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Customer Dashboard
          </Link>
          <Link
            to="/view-products"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            View Products
          </Link>
          <Link
            to="/profile"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Profile
          </Link>
        </>
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-purple-600 text-white p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My App</h2>
          {/* Role Selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-purple-500 text-white rounded-md px-2 py-1"
          >
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="space-y-4">{renderSidebarLinks()}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* The main content area where you can render the specific page */}
        <h1 className="text-3xl font-semibold">Welcome {role}</h1>
        {/* You can conditionally render different components based on the selected role here */}
      </div>
    </div>
  );
};

export default Sidebar;
