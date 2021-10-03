import { Input } from "antd";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";

import "./searchbar.scss";

const { Search } = Input;

export const SearchBar = () => {
  const { t } = useTranslation();

  const onSearch = (value: string) => {
    console.log({ value });
  };

  return (
    <Search
      className="searchbar"
      placeholder={t("common.form.search")}
      allowClear
      enterButton={t("common.form.searchBtn")}
      onSearch={onSearch}
      disabled={true}
    />
  );
};
