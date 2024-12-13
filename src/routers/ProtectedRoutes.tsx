import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { useCurrentToken } from "../redux/features/Auth/AuthSlice";
import { Navigate } from "react-router-dom";
import { userApi } from "../redux/features/user/userApi";

const ProtectedRoutes = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  const token = useAppSelector(useCurrentToken);
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;
  const userRole = user?.role;
  console.log("Private", userRole);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect if the user doesn't have permission to access this route
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
