import {useRouter} from "next/router";
import {useContext} from "react";
import {CommonContext} from "../../contexts/commonContext/commonContext";

export const useMenu = () => {
  const {isSidebarCollapse, setSidebarCollapse} = useContext(CommonContext);
  const router = useRouter();
  const {route, asPath} = router;
  const selectedParent = route === "/" ? "home" : route.split("/")[1];
  const selectedKey = route === "/" ? "home" : asPath.split("/")[1];

  const handleMenuRedirect = (path: string) => {
    router.push(path, undefined, {shallow: false});
    if (!isSidebarCollapse) {
      setSidebarCollapse();
    }
  };

  return {
    selectedKey,
    handleMenuRedirect,
    currentRoute: selectedParent,
  };
};
