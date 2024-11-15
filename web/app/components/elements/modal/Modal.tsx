"use client";

// next
import Link from "next/link";
// style
import "./modal.scss";
import { useState } from "react";

import { ReactNode } from "react";

const Modal = ({children, isOpen, handleClose}: {children: ReactNode, isOpen: boolean, handleClose:() => void}) => {

  if(!isOpen) return null

  // const handleCloseModal = () => {
  //   setIsOpen(false);
  // };
  return (
    <>
      {isOpen && (
        <>
          <div className="modalMask" onClick={handleClose}></div>
          <div className="modal">
            <button className="modalCloseBtn" onClick={handleClose}>
              ×
            </button>
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
