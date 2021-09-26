import { Menu } from "antd";
import { MenuMode } from "antd/lib/menu";
import React, { useContext } from "react";
import { UserContext } from "../../../contexts/userContext/userContext";
import { useMenu } from "../../../hooks/useMenu/useMenu";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { CategoryInfo } from "../../../models/Category";
import { PageKeys } from "../../../models/PageProps";

import "./main-menu.scss";
import { MenuItemContent } from "./MenuItemContent";

const { SubMenu, Item } = Menu;

type MainMenuProps = {
  mode?: MenuMode;
};

export const MainMenu = ({ mode = "horizontal" }: MainMenuProps) => {
  const { t } = useTranslation();
  const { categoryList } = useContext(UserContext);
  const { selectedKey } = useMenu();

  return (
    <Menu className="main-menu" selectedKeys={[selectedKey]} mode={mode}>
      <Item key="home">
        <MenuItemContent path="/" label={t("menu.home")} />
      </Item>
      <SubMenu
        key={PageKeys.products}
        title={
          mode === "horizontal" ? (
            <MenuItemContent
              path="/products"
              label={t(`menu.${PageKeys.products}`)}
            />
          ) : (
            <span>{t(`menu.${PageKeys.products}`)}</span>
          )
        }
        className={
          selectedKey.startsWith(PageKeys.products)
            ? `ant-menu-item-selected`
            : ""
        }
      >
        <Item>
          <MenuItemContent
            shallow={true}
            path={`/${PageKeys.products}`}
            label={t("menu.allCats")}
            className="ant-menu-custom-link menu-item-content submenu-item-content"
          />
        </Item>
        {(categoryList || []).map((category: CategoryInfo) => (
          <Item key={`${PageKeys.products}#${category.slug}`}>
            <MenuItemContent
              shallow={true}
              path={`/${PageKeys.products}#${category.slug}`}
              label={category.name}
              className="ant-menu-custom-link menu-item-content submenu-item-content"
            />
          </Item>
        ))}
      </SubMenu>
      <Item key={PageKeys.combo} disabled={true}>
        <MenuItemContent
          path={`/${PageKeys.combo}`}
          label={t(`menu.${PageKeys.combo}`)}
        />
      </Item>
      <Item key={PageKeys.share} disabled={true}>
        <MenuItemContent
          path={`/${PageKeys.share}`}
          label={t(`menu.${PageKeys.share}`)}
        />
      </Item>
      <Item key={PageKeys.terms} disabled={true}>
        <MenuItemContent
          path={`/${PageKeys.terms}`}
          label={t(`menu.${PageKeys.terms}`)}
        />
      </Item>
      <Item key={PageKeys.about} disabled={true}>
        <MenuItemContent
          path={`/${PageKeys.about}`}
          label={t(`menu.${PageKeys.about}`)}
        />
      </Item>
    </Menu>
  );
};
