"use client";

// react
import React, { ReactNode, useContext } from "react";
// components
import { ModalContext } from "../../functions/ModalContext";
// style
import "./modal.scss";

const Modal = ({ children }: { children: ReactNode }) => {
  const { isModalOpen, setIsModalOpen, showCloseButton, setShowCloseButton } =
    useContext(ModalContext);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <>
          {showCloseButton ? (
            <div className="modalMask" onClick={handleCloseModal}></div>
          ) : (
            <div className="modalMask"></div>
          )}
          <div className="modal">
            {showCloseButton && 
              <button className="modalCloseBtn" onClick={handleCloseModal}>
                ×
              </button>
            }
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

// "use client";

// // next
// import Link from "next/link";
// // style
// import "./modal.scss";
// import { ReactNode, useContext, useState } from "react";

// import ModalContext from "../../functions/ModalContext";

// const Modal = ({children}: {children: ReactNode}) => {

//   const { isOpen, setIsOpen } = useContext(ModalContext);
//   const handleCloseModal = () => {
//     setIsOpen(false);
//   };
//   return (
//     <>
//       {isOpen && (
//         <>
//           <div className="modalMask" onClick={handleCloseModal}></div>
//           <div className="modal">
//             <button className="modalCloseBtn" onClick={handleCloseModal}>
//               ×
//             </button>
//             {children}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Modal;
