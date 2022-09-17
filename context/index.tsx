import { createContext, useRef, useState } from "react";

interface ContextState {
  headerRef: React.MutableRefObject<HTMLDivElement>;
  isMenuOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export const Context = createContext<ContextState>({} as ContextState);

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const headerRef = useRef({} as HTMLDivElement);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const state: ContextState = {
    headerRef,
    isMenuOpen: [isMenuOpen, setIsMenuOpen]
  };

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
}