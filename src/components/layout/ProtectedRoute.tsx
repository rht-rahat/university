import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { currentToken, logOut } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(currentToken);
  const dispatch = useAppDispatch();
  console.log(role);
  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  // console.log("Token:", token);
  // console.log("User:", user);
  // console.log("Expected role:", role);
  // console.log("Actual role:", user?.role);

  useEffect(() => {
    if (token && role && user?.role && role !== user.role) {
      console.warn("Role mismatch: Expected", role, "but got", user.role);
      dispatch(logOut());
    }
  }, [role, user, dispatch, token]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (role && user?.role && role !== user.role) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
