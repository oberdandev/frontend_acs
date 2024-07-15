import React from 'react';
import style from './style.module.css'

function Modal({ isOpen, onClose, headerColor, title, children }) {
  return (
    <>
      {isOpen && (
        <div className={style.modal_wrapper}>
          <div className={style.modal_overlay} onClick={onClose}></div>
          <div className={style.modal_content}>
            <div className={style.modal_header} style={{ backgroundColor: headerColor }}>
              <strong className={style.modal_title}>{title}</strong>
            </div>
            <div className={style.modal_body}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;