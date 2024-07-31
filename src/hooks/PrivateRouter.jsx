import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = (props) => {
  const auth = useAuth();
  console.log('PrivateRoute user:', auth.user)
  console.log('privateRoute', auth.token)
  if (!auth.token) 
    return <Navigate to="/login"/>;
  
  return <Outlet />;
};

export default PrivateRoute;
