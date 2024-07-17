import {createContext, useState, useContext} from 'react';
import { api } from '../services/api.js';

export const AuthContext = createContext();

export function AuthProvider ({children}) {	
  const [auth, setAuth] = useState(false);
  const [userContext, setUserContext] = useState(null);
  
  const login = async (cpf, password) => {
    const response = await api.post('/login', () => {
      cpf,
      password
    })

    const { token } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setAuth(true);
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{userContext, setUserContext, auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth () {
  return useContext(AuthContext);
}
