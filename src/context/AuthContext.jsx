import { useContext, createContext, useState } from "react";
import { api } from "../services/api";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('token:', token , 'AuthContext line 12')

  const loginAction = async (data) => {
    try {
      const response = await api.post("/login", data);
      Cookies.set('token', response.data.token);
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

