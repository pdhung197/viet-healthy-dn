import {Menu} from "antd";
import React from "react";
import {useMenu} from "../../../hooks/useMenu/useMenu";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {prodCats, ProdCatType} from "../../../mocks/prodCats";

import "./main-menu.scss";
import {MenuItemContent} from "./MenuItemContent";

const {SubMenu, Item} = Menu;

export const MainMenu = ({mode}: any) => {
  const {t, getLanguage} = useTranslation();

  const currentLang = getLanguage();

  const {selectedKey} = useMenu();

  return (
    <Menu
      className="main-menu"
      selectedKeys={[selectedKey]}
      mode={mode || "horizontal"}
    >
      <Item key="home">
        <MenuItemContent path="/" label={t("menu.home")} />
      </Item>
      <SubMenu
        key="products"
        title={
          <MenuItemContent path="/products/all" label={t("menu.products")} />
        }
        className={
          selectedKey.startsWith("products") ? `ant-menu-item-selected` : ""
        }
      >
        <Item>
          <MenuItemContent
            path="/products/all"
            label={t("menu.allCats")}
            className="ant-menu-custom-link menu-item-content submenu-item-content"
          />
        </Item>
        {(prodCats || []).map((prodCat: ProdCatType) => (
          <Item key={`products:${prodCat.key}`}>
            <MenuItemContent
              path={`/products/${prodCat.key}`}
              label={prodCat.label[currentLang]}
              className="ant-menu-custom-link menu-item-content submenu-item-content"
            />
          </Item>
        ))}
      </SubMenu>
      <Item key="combo">
        <MenuItemContent path="/combo" label={t("menu.combo")} />
      </Item>
      <Item key="about">
        <MenuItemContent path="/about" label={t("menu.about")} />
      </Item>
      <Item key="contact">
        <MenuItemContent path="/contact" label={t("menu.contact")} />
      </Item>
    </Menu>
  );
};
