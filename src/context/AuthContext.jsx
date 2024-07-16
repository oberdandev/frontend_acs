import {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export function AuthProvider ({children}) {	
  const [user, setUser] = useState(null);
  
  const login = (username, password) => {
    setUser({username})
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth () {
  return useContext(AuthContext);
}
