import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import PageAbout from './pages/About.jsx'
import PageLogin from './pages/Login/Login.jsx'
import PageForm from './pages/Form/Form.jsx'
import PageException from './pages/Exception/Exception.jsx'
import PageNotFound from './pages/Exception/PageNotFound.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />
  },
  { 
    path: '*', 
    element: <PageNotFound />
  },
  {
    path: '/about', 
    element: <PageAbout />,
    errorElement: <PageException />
  },
  {
    path: '/form',
    element: <PageForm />,
    errorElement: <PageException />
  },
  {
    path: '/login',
    element: <PageLogin />,
    errorElement: <PageException />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router}>
      
    </RouterProvider>
  </React.StrictMode>
)
