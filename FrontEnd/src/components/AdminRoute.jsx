import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { authState } from "@store/slices/auth.slice";

const AdminRoute = ({ children }) => {
  const { isLogin, authData } = useAppSelector(authState);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  const hasAdminRole = authData?.role?.includes("ROLE_ADMIN");

  if (!hasAdminRole) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default AdminRoute;
