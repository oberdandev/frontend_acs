import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar"
import Login from '../src/pages/Login/Login'
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

function App({children}) {
  const {token, user} = useAuth();

  if(!user){
    return (
      window.location.replace('/login')
    )
  } 

  return (
    <div className='flex max-w-screen' style={{minHeight: '100vh'}}> 
      <Sidebar />
        {children ? children : <Outlet />}
    </div>
  )
}

export default App;
