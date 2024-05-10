// atoms/AtomContext.js
import React from "react";
import { createContext, useContext } from "react";
import { Provider } from "jotai";

export const AtomContext = createContext(null);

export const useAtomContext = () => useContext(AtomContext);

export const AtomProvider = ({ children }) => {
  return (
    <AtomContext.Provider value={null}>
      <Provider>{children}</Provider>
    </AtomContext.Provider>
  );
};
