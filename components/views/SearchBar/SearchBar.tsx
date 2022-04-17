import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../../../contexts/userContext/userContext";
import { Dropdown, Input, Menu } from "antd";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SearchItemType, useSearch } from "./useSearch";

import "./searchbar.scss";

const { Search } = Input;

export const SearchBar = () => {
  const { t } = useTranslation();
  const { onSearch, onChange, searchList } = useSearch();
  const { productsList } = useContext(UserContext);

  const getMenu = () => (
    <Menu className="search-group__dropdown">
      {(searchList || []).map((searchResult: SearchItemType, index: number) => {
        return (
          <Menu.Item key={index}>
            <Link href={searchResult.url}>
              <a>
                <div className="product-search-item">
                  <div className="product-search-item__img"></div>
                  <div className="product-search-item__content">
                    <h3>{searchResult.label}</h3>
                  </div>
                </div>
              </a>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div className="search-group">
      <Dropdown overlay={getMenu()} placement="bottomLeft" trigger={["click"]}>
        <Search
          className="search-group__searchbar"
          placeholder={t("common.form.search")}
          allowClear
          disabled={!productsList?.length}
          enterButton={t("common.form.searchBtn")}
          onSearch={(search: string) => onSearch(search, productsList)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value, productsList)
          }
          onAbort={() => {
            console.log("Abort");
            onChange("", []);
          }}
        />
      </Dropdown>
    </div>
  );
};
