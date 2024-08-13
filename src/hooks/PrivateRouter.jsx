import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageAbout from "../pages/About";

const PrivateRoute = (props) => {
  const user = useAuth();
  if (!user?.user) return <Navigate to="/login" />;
  
  return <Outlet />;
};

export default PrivateRoute;
