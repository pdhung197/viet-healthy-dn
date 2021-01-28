import {AlignLeftOutlined} from "@ant-design/icons";
import {Button, Menu} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useMenu} from "../../../hooks/useMenu/useMenu";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {prodCats, ProdCatType} from "../../../mocks/prodCats";

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

  const [openKey, setopenKey] = useState(
    selectedKey === "home" ? "products" : "anything"
  );
  const {t, currentLang} = useTranslation();

  const onTitleClick = () => {
    setopenKey(openKey === "products" ? "anything" : "products");
  };

  useEffect(() => {
    if (selectedKey === "home") {
      return setopenKey("products");
    }
    setopenKey("anything");
  }, [selectedKey]);

  return (
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
        <Menu.Item key="products:all">
          <Link href="/products/all">
            <a>{t("menu.allCats")}</a>
          </Link>
        </Menu.Item>
        {(prodCats || []).map((prodCat: ProdCatType) => (
          <Menu.Item key={`products:${prodCat.key}`}>
            <Link href={`/products/${prodCat.key}`}>
              <a>{prodCat.label[currentLang]}</a>
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
};
