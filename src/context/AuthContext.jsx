import { useContext, createContext, useState } from "react";
import { api } from "../services/api";
import { Navigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const loginAction = async (data) => {
    try {
      console.log('login action', data)
      const response = await api.post("/login", data);
      console.log('response.data', response.data)

      if(response.status === 404) {
        return {status: 404, data: response?.data}
      }
      
      if(response) {
        setUser(response.data.user);
        setToken(response.token);
        localStorage.setItem("token", response.data.token);
        console.log("User", response.data.user);  
        console.log('antes do navigaste');
        console.log('depois do navigate')
        console.log('usuario do estado', user);
        return <Navigate to='/about'/>       
      }
 
      console.log('user', user)
      console.log('token', localStorage.getItem("token"))
     
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;


