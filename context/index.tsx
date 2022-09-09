import { createContext, useState } from "react";

interface ContextState {
  isMenuOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export const Context = createContext<ContextState>({} as ContextState);

export const ContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const state: ContextState = {
    isMenuOpen: [isMenuOpen, setIsMenuOpen]
  };

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
}