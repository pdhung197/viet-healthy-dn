import {useRouter} from "next/router";
import {useContext} from "react";
import {CommonContext} from "../../contexts/commonContext/commonContext";

export const useMenu = () => {
  const {isSidebarCollapse, setSidebarCollapse} = useContext(CommonContext);
  const router = useRouter();
  const {route, query} = router;
  const selectedParent = route === "/" ? "home" : route.split("/")[1];
  const selectedChilds = (Object.keys(query) || []).map(
    (key: string) => query[key]
  );

  const selectedKey =
    selectedParent +
    (selectedChilds.length ? ":" + selectedChilds.join(":") : "");

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
