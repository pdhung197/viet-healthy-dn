import {AlignLeftOutlined} from "@ant-design/icons";
import {Button, Menu} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import Link from "next/link";
import {LegacyRef, useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../contexts/userContext/userContext";
import useOutsideClick from "../../../hooks/useClickOutside/useClickOutside";
import {useMenu} from "../../../hooks/useMenu/useMenu";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {CategoryInfo} from "../../../models/Category";

import "./cat-dropdown.scss";

const DropDownBtn = () => {
  const {t} = useTranslation();
  return (
    <Button className="cats-dropdown__topbtn" icon={<AlignLeftOutlined />}>
      {t("menu.cats")}
    </Button>
  );
};

export const CatsDropdown = () => {
  const {selectedKey, currentRoute} = useMenu();
  const {categoryList = []} = useContext(UserContext);
  const menuRef = useRef<LegacyRef<HTMLDivElement> | undefined>();

  const [openKey, setopenKey] = useState(
    selectedKey === "home" ? "products" : "anything"
  );
  const {t, currentLang} = useTranslation();

  const onTitleClick = () => {
    setopenKey(openKey === "products" ? "anything" : "products");
  };

  const handleCloseMenu = () => {
    if (selectedKey !== "home" && openKey !== "anything") {
      setopenKey("anything");
    }
  };
  useOutsideClick(menuRef, handleCloseMenu);

  useEffect(() => {
    if (selectedKey === "home") {
      return setopenKey("products");
    }
    setopenKey("anything");
  }, [selectedKey]);

  return (
    <div ref={menuRef as LegacyRef<HTMLDivElement>} className="menu-wrapper">
      <Menu
        selectedKeys={[selectedKey]}
        openKeys={[openKey]}
        mode="inline"
        className={`cats-dropdown ${
          currentRoute !== "home" ? "relative-dropdown" : ""
        }`}
      >
        <SubMenu
          key="products"
          title={<DropDownBtn />}
          onTitleClick={onTitleClick}
        >
          <Menu.Item key="products">
            <Link shallow={true} href="/products">
              <a>{t("menu.allCats")}</a>
            </Link>
          </Menu.Item>
          {categoryList.map((category: CategoryInfo) => (
            <Menu.Item key={`products#${category.slug}`}>
              <Link shallow={true} href={`/products#${category.slug}`}>
                <a>{category.name}</a>
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </div>
  );
};
