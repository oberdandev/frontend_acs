import { useContext, createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profissional, setProfissional] = useState({});
  document.cookie = `Bearer Authorization ${token}`;
  document.headers = `Bearer Authorization ${token}`;

  useEffect(() => {
     
  }, [])

  console.log('token:', token , 'AuthContext line 12')

  const loginAction = async (data) => {
    try {
      const response = api.post("/login", data);
      return response;

    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    return ;
  };

  const defineToken = async () => {
    const token = localStorage.getItem("token");
    if(token) {
      setToken(token)
  }
}

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, setUser, profissional, setProfissional, defineToken }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;