import { Outlet } from "react-router-dom";
import ModernNavbar from "../components/modern/ModernNavbar";
import ModernFooter from "../components/modern/ModernFooter";

const Main = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ModernNavbar />
        <div className="pt-4">
          <Outlet />
        </div>
        <ModernFooter />
      </div>
    </>
  );
};
export default Main;
