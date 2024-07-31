import React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose, title, children }) => {
  return ReactDOM.createPortal(
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default Modal;
