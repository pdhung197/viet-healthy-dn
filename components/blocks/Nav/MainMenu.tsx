import {Menu} from "antd";
import React, {useContext} from "react";
import {UserContext} from "../../../contexts/userContext/userContext";
import {useMenu} from "../../../hooks/useMenu/useMenu";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {CategoryInfo} from "../../../models/Category";

import "./main-menu.scss";
import {MenuItemContent} from "./MenuItemContent";

const {SubMenu, Item} = Menu;

export const MainMenu = ({mode}: any) => {
  const {t} = useTranslation();
  const {categoryList = []} = useContext(UserContext);
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
        title={<MenuItemContent path="/products" label={t("menu.products")} />}
        className={
          selectedKey.startsWith("products") ? `ant-menu-item-selected` : ""
        }
      >
        <Item>
          <MenuItemContent
            shallow={true}
            path="/products"
            label={t("menu.allCats")}
            className="ant-menu-custom-link menu-item-content submenu-item-content"
          />
        </Item>
        {categoryList.map((category: CategoryInfo) => (
          <Item key={`products#${category.slug}`}>
            <MenuItemContent
              shallow={true}
              path={`/products#${category.slug}`}
              label={t(`menu.${category.slug}`) || category.name}
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
