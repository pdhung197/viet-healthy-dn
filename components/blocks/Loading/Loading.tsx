import {LoadingOutlined} from "@ant-design/icons";
import React from "react";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

type LoadingProps = {
  isShow: boolean;
};

export const Loading = ({isShow}: LoadingProps) => {
  const {t} = useTranslation();

  return (
    <div className={`loading ${isShow ? "show" : ""}`}>
      <span>{t("common.waiting")}</span>
      <LoadingOutlined />
    </div>
  );
};
