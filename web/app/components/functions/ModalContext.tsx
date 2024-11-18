
"use client";

import React, { createContext,  Dispatch,  ReactNode,  SetStateAction,  useState } from "react";

// providerが存在しない場合の初期値(必須)
export const ModalContext = createContext<{
  isModalOpen: boolean,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>, 
  showCloseButton: boolean,
  setShowCloseButton: Dispatch<SetStateAction<boolean>>
}>({
  isModalOpen: false,
  setIsModalOpen: () => {},
  showCloseButton: true,
  setShowCloseButton: () => {}
});

const ModalProvider= ({children}: {children: ReactNode}) => {
  // providerが存在しない場合の初期値
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ showCloseButton, setShowCloseButton ] = useState(true)

  return (
    <ModalContext.Provider value={{isModalOpen, setIsModalOpen, showCloseButton, setShowCloseButton}}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider





























// "use client";

// import React, { createContext,  ReactNode,  useState } from "react";

// const ModalContext = createContext({
//   isOpen: false,
//   setIsOpen: (value: boolean) => {} 
// });

// export const ModalProvider = ({ children } : {children : ReactNode}) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <ModalContext.Provider value={{ isOpen, setIsOpen }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };

// export default ModalContext;