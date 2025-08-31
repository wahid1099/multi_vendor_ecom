import { Outlet } from "react-router-dom";
import ModernSidebar from "../components/Dashboard/ModernSidebar";
import UserSidebar from "../components/Dashboard/UserSidebar";
import { useAppSelector } from "../redux/hook";
import {
  useCurrentToken,
  selectCurrentUser,
} from "../redux/features/Auth/AuthSlice";
import { userApi } from "../redux/features/user/userApi";

const DashboadLayout = () => {
  // Get auth state
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);

  // Fetch user data if token exists
  const { data: userData } = userApi.endpoints.getMe.useQuery(
    {},
    {
      skip: !token,
    }
  );

  const user = userData?.data || currentUser;

  // Determine which sidebar to show based on user role
  const renderSidebar = () => {
    if (!user) return <ModernSidebar />; // Default to admin sidebar if no user

    switch (user.role) {
      case "Customer":
        return <UserSidebar />;
      case "Admin":
      case "Vendor":
      default:
        return <ModernSidebar />;
    }
  };

  return (
    <div className="relative min-h-screen md:flex bg-gradient-to-br from-gray-50 to-gray-100">
      {renderSidebar()}
      <div className="flex-1 md:ml-64">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboadLayout;
