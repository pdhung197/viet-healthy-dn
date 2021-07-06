import Link from "next/link";
import React from "react";
import {BsHouseFill} from "react-icons/bs";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

import "./BreadCrumb.scss";

export type BData = {
  label: string;
  path?: string;
  asPath?: string;
};

type BreadCrumbProps = {
  bDatas: BData[];
};

export const BreadCrumb = ({bDatas}: BreadCrumbProps) => {
  const {t} = useTranslation();

  return (
    <p className="breadcrumb">
      <BsHouseFill />
      <Link href="/">
        <span>{t("menu.home")}</span>
      </Link>
      {bDatas.map((bData: BData, index: number) => (
        <React.Fragment key={index}>
          {">"}{" "}
          {bData.path ? (
            <Link href={bData.path} as={bData.asPath} shallow={true}>
              <span>{bData.label}</span>
            </Link>
          ) : (
            <span>{bData.label}</span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};
