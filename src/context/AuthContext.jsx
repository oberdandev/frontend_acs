import { useContext, createContext, useState } from "react";
import { api } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profissional, setProfissional] = useState({});

  const loginAction = async (data) => {
    try {
      const response = api.post("/login", data);
      return response;

      /* if(response) {
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
      console.log('token', localStorage.getItem("token")) */
     
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return ;
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, setUser, profissional, setProfissional }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;


