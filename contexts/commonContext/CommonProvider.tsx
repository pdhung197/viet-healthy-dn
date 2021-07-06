import {useEffect, useState} from "react";
import {CommonProps} from "../../models/Common";
import {CommonContext} from "./commonContext";

export const CommonProvider = ({children}: CommonProps) => {
  const [isSidebarCollapse, setIsSidebarCollapse] = useState(true);

  useEffect(() => {
    setIsSidebarCollapse(
      window.localStorage.getItem("isSidebarCollapse") === "true"
    );
  }, []);

  const provider = {
    isSidebarCollapse,
    setSidebarCollapse: (manualState?: boolean) => {
      const newState =
        manualState === undefined ? !isSidebarCollapse : manualState;
      setIsSidebarCollapse(newState);
      if (window) {
        window.localStorage.setItem("isSidebarCollapse", newState.toString());
      }
    },
  };

  return (
    <CommonContext.Provider value={provider}>{children}</CommonContext.Provider>
  );
};
