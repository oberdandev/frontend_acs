import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import PageAbout from './pages/About.jsx'
import PageLogin from './pages/Login/Login.jsx'
import PageForm from './pages/Form/Form.jsx'
import PageFormManager from './pages/FormManager/FormManager.jsx'
import PageDailies from './pages/ResumosDiarios/PageDailies.jsx'
import PageDaboard from './pages/Dasboard/Dashboard.jsx'
import PageException from './pages/Exception/Exception.jsx'
import PageNotFound from './pages/Exception/PageNotFound.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx'
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageRegister from './pages/Register/Register.jsx'
import HomePage from './pages/Home.jsx'
import PrivateRoute from './hooks/PrivateRouter.jsx'
import PageUsers from './pages/Users/PageUsers.jsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="about"
                element={ <PrivateRoute />  }
                errorElement={<PageException />}>
            <Route index element={<PageAbout />} />
          </Route>
          <Route
            path="form-manager"
            element={<PrivateRoute />}
            errorElement={<PageException />}>
            <Route index element={<PageFormManager />} />
          </Route>
          <Route
            path="dailies"
            element={<PrivateRoute />}
            errorElement={<PageException />}>
            <Route index element={<PageDailies />} />
          </Route>
          <Route
            path="dasboard"
            element={<PageDaboard />}
            errorElement={<PageException />}
          />
          <Route
            path="form"
            element={<PageForm />}
            errorElement={<PageException />}
          />
          <Route
            path="users"
            element={<PrivateRoute/>}
            errorElement={<PageException />}>
              <Route index element={<PageUsers />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<PageLogin />} errorElement={<PageException />} />
        <Route path="register" element={<PageRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>     
          <ToastContainer  autoClose={5000} />
          <AppRoutes />
        </AuthProvider>
  </React.StrictMode>
)
