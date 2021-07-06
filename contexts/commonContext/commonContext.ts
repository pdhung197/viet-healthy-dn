import {createContext} from "react";

export const CommonContext = createContext({
  isSidebarCollapse: true,
  setSidebarCollapse: (manualState?: boolean) => {
    console.log({manualState});
  },
});
