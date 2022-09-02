import { createContext, useState } from "react";

interface ContextState {
  isMenuOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export const InteractionContext = createContext<ContextState>({} as ContextState);

export const InteractionContextProvider: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const state: ContextState = {
    isMenuOpen: [isMenuOpen, setIsMenuOpen]
  };

  return (
    <InteractionContext.Provider value={state}>
      {children}
    </InteractionContext.Provider>
  );
}