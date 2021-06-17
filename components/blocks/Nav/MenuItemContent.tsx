import {useRouter} from "next/router";
import {useContext} from "react";
import {CommonContext} from "../../../contexts/commonContext/commonContext";

type MenuContentProps = {
  path: string;
  as?: string;
  label: string;
  className?: string;
  shallow?: boolean;
};

export const MenuItemContent = ({
  path,
  label,
  className = "menu-item-content",
  as,
  shallow = false,
}: MenuContentProps) => {
  const {isSidebarCollapse, setSidebarCollapse} = useContext(CommonContext);
  const router = useRouter();

  const handleMenuClick = () => {
    router.push(path, as, {shallow});
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
