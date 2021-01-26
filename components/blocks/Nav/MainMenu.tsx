import {Menu} from "antd";
import {useRouter} from "next/router";
import React, {useContext} from "react";
import {CommonContext} from "../../../contexts/commonContext/commonContext";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {prodCats, ProdCatType} from "../../../mocks/prodCats";

import "./main-menu.scss";

const {SubMenu, Item} = Menu;

type MenuContentProps = {
  path: string;
  label: string;
  className?: string;
};

const MenuItemContent = ({
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

export const MainMenu = ({mode}: any) => {
  const {t, getLanguage} = useTranslation();

  const mathRandom = (Math.random() * 10).toFixed(0);

  const currentLang = getLanguage();

  const router = useRouter();
  const {route, query} = router;
  const selectedParent = route === "/" ? "home" : route.split("/")[1];
  const selectedChilds = (Object.keys(query) || []).map(
    (key: string) => query[key]
  );

  const selectedKey =
    selectedParent +
    (selectedChilds.length ? ":" + selectedChilds.join(":") : "");

  return (
    <Menu
      className="main-menu"
      selectedKeys={[selectedKey + mathRandom]}
      mode={mode || "horizontal"}
    >
      <Item key={`home${mathRandom}`}>
        <MenuItemContent path="/" label={t("menu.home")} />
      </Item>
      <SubMenu
        key={`products${mathRandom}`}
        title={<MenuItemContent path="/products" label={t("menu.products")} />}
        className={
          selectedKey.startsWith("products") ? `ant-menu-item-selected` : ""
        }
      >
        {(prodCats || []).map((prodCat: ProdCatType) => (
          <Item key={`products:${prodCat.key}${mathRandom}`}>
            <MenuItemContent
              path={`/products/${prodCat.key}`}
              label={prodCat.label[currentLang]}
              className="ant-menu-custom-link menu-item-content submenu-item-content"
            />
          </Item>
        ))}
      </SubMenu>
      <Item key={`combo${mathRandom}`}>
        <MenuItemContent path="/combo" label={t("menu.combo")} />
      </Item>
      <Item key={`about${mathRandom}`}>
        <MenuItemContent path="/about" label={t("menu.about")} />
      </Item>
      <Item key={`contact${mathRandom}`}>
        <MenuItemContent path="/contact" label={t("menu.contact")} />
      </Item>
    </Menu>
  );
};
