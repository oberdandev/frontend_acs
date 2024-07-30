import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SquareChevronLeft } from 'lucide-react';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { AiOutlineForm } from "react-icons/ai";
import { FaCircleArrowLeft, FaMosquito  } from "react-icons/fa6";
import Avatar from '../Avatar';

  const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

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
      icon: <Avatar imgSrc="/img/templates/profile.jpg" size={24} elemBorder='0px solid #000' />,
      href: '/about'
    },
    {
      title: "Relatórios",
      icon: <HiOutlineClipboardDocumentList size={24}/>,
      href: '/form-manager'
    },
    {
      title: "Teste",
      icon: <SquareChevronLeft />,
      href: '/'
    }
  ]

  function SidebarMenus() {
    return (
      <>
        <ul className='pt-6'>
            {Menus.map((menu, index)=> (
                  <li 
                    key={index} 
                    className={`flex pt-6 text-gray-200 text-sm items-center gap-x-4 cursor-pointer hover:text-sky-500 font-bolds`}>
                    <NavLink key={menu.title} to={menu.href} className={({isActive}) => `flex gap-x-4 ${isActive ? 'text-sky-300 hover:text-sky-500' : ''}`}>
                      <span>{menu.icon}</span>
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