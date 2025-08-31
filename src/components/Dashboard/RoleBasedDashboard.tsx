import React from "react";
import { useAppSelector } from "@/redux/hook";
import {
  useCurrentToken,
  selectCurrentUser,
} from "@/redux/features/Auth/AuthSlice";
import { userApi } from "@/redux/features/user/userApi";
import AdminDashboard from "./AdminDashboard";
import UserDashboardPage from "@/pages/UserDashboard/UserDashboardPage";
import VendorDashboard from "./VendorDashboard";

const RoleBasedDashboard: React.FC = () => {
  // Get auth state
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);

  // Fetch user data if token exists
  const { data: userData, isLoading } = userApi.endpoints.getMe.useQuery(
    {},
    {
      skip: !token,
    }
  );

  const user = userData?.data || currentUser;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-500">
            Please log in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Render dashboard based on user role
  switch (user.role) {
    case "Customer":
      return <UserDashboardPage />;
    case "Admin":
      return <AdminDashboard />;
    case "Vendor":
      return <VendorDashboard />;
    default:
      return <UserDashboardPage />;
  }
};

export default RoleBasedDashboard;
