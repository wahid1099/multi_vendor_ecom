import { Outlet } from "react-router-dom";
import ModernSidebar from "../components/Dashboard/ModernSidebar";

const DashboadLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-gradient-to-br from-gray-50 to-gray-100">
      <ModernSidebar />
      <div className="flex-1 md:ml-64">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboadLayout;
