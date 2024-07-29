import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar"
import Login from '../src/pages/Login/Login'

function App(props) {

  /* if(!props.userToken){
    return (
      <Login/>
    )
  } */

  return (
    <div className='flex h-full w-full' style={{minHeight: '100vh'}}> 
      <Sidebar />
      {props.outlet ? props.outlet : <Outlet />}
    </div>
  )
}

export default App;
