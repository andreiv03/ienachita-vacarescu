import { createContext, useRef, useState } from "react";

interface ContextState {
  isMenuOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  headerRef: React.MutableRefObject<HTMLDivElement>;
};

export const Context = createContext<ContextState>({} as ContextState);

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef({} as HTMLDivElement);

  const state: ContextState = {
    isMenuOpen: [isMenuOpen, setIsMenuOpen],
    headerRef
  };

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
}