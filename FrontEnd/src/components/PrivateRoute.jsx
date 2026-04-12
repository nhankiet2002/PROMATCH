import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { authState } from "@store/slices/auth.slice";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useAppSelector(authState);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
