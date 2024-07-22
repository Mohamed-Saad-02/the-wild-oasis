import { createContext, useContext, useReducer } from "react";

const initialState = {
  isActiveSidebar: false,
};

const themeContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "activeSidebar":
      return { ...state, isActiveSidebar: !state.isActiveSidebar };
    default:
      throw new Error("Action unknown");
  }
}

function ThemeProvider({ children }) {
  const [{ isActiveSidebar }, dispatch] = useReducer(reducer, initialState);

  return (
    <themeContext.Provider value={{ isActiveSidebar, dispatch }}>
      {children}
    </themeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(themeContext);

  if (context === undefined)
    throw new Error("Your used Context outside ContextProvider");
  return context;
}

export { ThemeProvider, useTheme };
