import {useRouter} from "next/router";
import {useContext} from "react";
import {CommonContext} from "../../../contexts/commonContext/commonContext";

type MenuContentProps = {
  path: string;
  label: string;
  className?: string;
};

export const MenuItemContent = ({
  path,
  label,
  className = "menu-item-content",
}: MenuContentProps) => {
  const {isSidebarCollapse, setSidebarCollapse} = useContext(CommonContext);
  const router = useRouter();

  const handleMenuClick = () => {
    router.push(path, undefined, {shallow: false});
    if (!isSidebarCollapse) {
      setSidebarCollapse();
    }
  };

  return (
    <button className={className} onClick={handleMenuClick}>
      {label}
    </button>
  );
};
