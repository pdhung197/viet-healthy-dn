import {createContext} from "react";

export const CommonContext = createContext({
  isSidebarCollapse: true,
  setSidebarCollapse: () => {
    console.log("Change");
  },
});
