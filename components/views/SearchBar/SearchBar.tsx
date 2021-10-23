import { Dropdown, Input, Menu } from "antd";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { SearchItemType, useSearch } from "./useSearch";

import "./searchbar.scss";
import React from "react";
import Link from "next/link";

const { Search } = Input;

export const SearchBar = () => {
  const { t } = useTranslation();
  const { onSearch, onChange, searchList } = useSearch();

  const menu =
    searchList && searchList.length ? (
      <Menu>
        {searchList.map((searchResult: SearchItemType, index: number) => {
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
    ) : (
      <></>
    );

  return (
    <div className="search-group">
      <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
        <Search
          className="search-group__searchbar"
          placeholder={t("common.form.search")}
          allowClear
          enterButton={t("common.form.searchBtn")}
          onSearch={onSearch}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          disabled={true}
        />
      </Dropdown>
    </div>
  );
};
