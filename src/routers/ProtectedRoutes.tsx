import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { useCurrentToken } from "../redux/features/Auth/AuthSlice";
import { Navigate } from "react-router-dom";
import { userApi } from "../redux/features/user/userApi";
import ClipLoader from "react-spinners/ClipLoader";

const ProtectedRoutes = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  const token = useAppSelector(useCurrentToken);
  const { data: getMe, isLoading } = userApi.useGetMeQuery(undefined, {
    skip: !token,
  });
  const user = getMe?.data;
  const userRole = user?.role;

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isLoading) {
    // Show a loader while fetching user data
    return (
      <div className="flex items-center">
        <ClipLoader
          color="#e93b16"
          loading={isLoading}
          size={20} // Adjust size for better alignment
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <span className="ml-2">Logging in...</span>
      </div>
    );
  }

  if (!user || (allowedRoles && !allowedRoles.includes(userRole))) {
    // Redirect if the user doesn't have permission to access this route
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
