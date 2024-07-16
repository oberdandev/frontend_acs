import { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');

  const showToastSuccess = (message) => {
    setToastMessage(message);
    toast.success(toastMessage);
  };

  return (
    <ToastContext.Provider value={{ showToastSuccess }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};