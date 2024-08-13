import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar"
import Login from '../src/pages/Login/Login'

function App({children}) {

  /* if(!props.userToken){
    return (
      <Login/>
    )
  } */

  return (
    <div className='flex h-full w-full' style={{minHeight: '100vh'}}> 
      <Sidebar />
      {children ? children : <Outlet />}
    </div>
  )
}

export default App;
