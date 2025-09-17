"use client";

import { createContext, useReducer, useMemo, useCallback } from "react";

interface LayoutState {
  isMenuOpen: boolean;
  headerRef: React.RefObject<HTMLElement | null>;
}

type LayoutAction = { type: "SET_IS_MENU_OPEN"; payload: boolean };

interface LayoutContext {
  state: LayoutState;
  setIsMenuOpen: (payload: boolean) => void;
}

export const LayoutContext = createContext<LayoutContext | null>(null);

const reducer = (state: LayoutState, action: LayoutAction): LayoutState => {
  switch (action.type) {
    case "SET_IS_MENU_OPEN":
      return { ...state, isMenuOpen: action.payload };

    default:
      return state;
  }
};

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isMenuOpen: false,
    headerRef: { current: null },
  });

  const setIsMenuOpen = useCallback((payload: boolean) => {
    dispatch({ type: "SET_IS_MENU_OPEN", payload });
  }, []);

  const contextValue = useMemo(() => ({ state, setIsMenuOpen }), [state, setIsMenuOpen]);

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
}
