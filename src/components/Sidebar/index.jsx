import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TbChartInfographic } from 'react-icons/tb';
import { SquareChevronLeft } from 'lucide-react';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaCircleArrowLeft, FaMosquito  } from "react-icons/fa6";
import { IoTodayOutline } from "react-icons/io5"; 
import { useAuth } from '../../context/AuthContext';
import { BsPersonCircle } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {logOut, user} = useAuth();
  const navigate = useNavigate();

  const logoutSystem = async () => {
    await logOut();
    navigate('/login', {replace: true});
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const Logo = {
    title: "SISCV",
    icon: <FaMosquito size={32} />,
    href: "/"
  }
  
  const Menus = [
    {
      title: "Perfil",
      icon: < BsPersonCircle size={24}/>,
      href: '/about'
    },
    {
      title: "Relatórios",
      icon: <HiOutlineClipboardDocumentList size={24}/>,
      href: '/form-manager'
    },
    {
      title: "Diários",
      icon: <IoTodayOutline size={24}/>,
      href: '/dailies'
    },
    {
      title: "Dasboard",
      icon: <TbChartInfographic  size={24}/>,
      href: '/dasboard'
    },
    {
      title: "Gerenciar Usuários",
      icon: <LiaUsersCogSolid size={24}/>,
      href: '/users',
    },
    {
      title: "Sair",
      icon: <SquareChevronLeft />,
      href: '/',
      func: logoutSystem
    },
  ]

  function SidebarMenus() {
    return (
      <>
        <ul className='pt-6'>
            {Menus.map((menu, index)=> (
                  <li 
                    key={index} 
                    className={`flex pt-6 text-gray-200 text-sm items-center gap-x-4 cursor-pointer hover:text-sky-500 font-bolds`}>
                    <NavLink key={menu.title} to={menu.href} className={({isActive}) => `flex gap-x-2 ${isActive ? 'text-sky-300 hover:text-sky-500' : ''}`}>
                      <button onClick={menu.func}>{menu.icon}</button>
                      <span className={`duration-300 origin-left font-bold text-lg ${!isOpen && 'scale-0'}`}>
                        {menu.title}
                      </span> 
                    </NavLink>
                  </li>
      
              )
            )}
          </ul>
      </>
    )
  }

  function SidebarHeader() {
    return (
      <>
        <FaCircleArrowLeft
          className={`absolute -right-4 top-20 w-12 h-8  cursor-pointer fill-gray-200 ${!isOpen && 'rotate-180' }`}
          onClick={toggleSidebar}
        />
      <NavLink id={Logo.title} to={Logo.href}> 
         <div className='flex gap-x-4 items-center'>
            <span className='text-zinc-50 cursor-pointer'>{Logo.icon}</span>
            <h1 
              className={`text-white origin-left text-2xl font-bold duration-300 ${!isOpen && "scale-0"}`}> 
              {Logo.title}
            </h1>
          </div>
        </NavLink>
      </>
    )
  }

  return (
    <div className={`${isOpen ? 'w-60' : 'w-20'} duration-300 bg-sky-900 relative p-5 pt-8 shadow-md shadow-slate-800`}>
      <SidebarHeader />
      <SidebarMenus />
    </div>
  );
};

export default Sidebar; 