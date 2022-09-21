import { createContext, useRef, useState } from "react";

interface Context {
  headerRef: React.MutableRefObject<HTMLDivElement>;
  isMenuOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export const Context = createContext<Context>({} as Context);

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const headerRef = useRef({} as HTMLDivElement);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const state: Context = {
    headerRef,
    isMenuOpen: [isMenuOpen, setIsMenuOpen]
  };

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};