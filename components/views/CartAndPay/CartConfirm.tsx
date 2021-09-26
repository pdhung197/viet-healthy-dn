import React, { useContext } from "react";
import { Table } from "antd";
import { UserContext } from "../../../contexts/userContext/userContext";
import { cartColumns, cartColumnsDesktop } from "./CartColums";
import { ProductInCart } from "../../../models/Product";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { TableColumn } from "../../../models/Common";

import { ProductRemoveCart } from "../ProductItem/ProductRemoveCart";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { calculateCartPrice } from "../../../helpers/productsFnc";
import Link from "next/link";
import { VHHead } from "../../blocks/Head/VHHead";

export const CartConfirm = () => {
  const { carts } = useContext(UserContext);

  const screens = useBreakpoint();
  const { t, currentLang } = useTranslation();

  const isMobile = !screens.md;

  const columns: TableColumn[] = [...cartColumns];

  const totalPrice = calculateCartPrice(carts);

  if (!isMobile) {
    columns.push(...cartColumnsDesktop, {
      title: () => <ProductRemoveCart className="cart-action" />,
      dataIndex: "remove",
      key: "remove",
      render: (text: string, cartItem: ProductInCart) => (
        <ProductRemoveCart className="cart-action" product={cartItem} />
      ),
    });
  }

  const columnWithLabel = () =>
    columns.map((column: TableColumn) => {
      if (column.key === "remove") {
        return column;
      }
      return {
        ...column,
        title: t(`pageData.cart.tableColumn.${column.key}`),
      };
    });

  return (
    <>
      <VHHead title={t(`pageData.cart.steps.cart.title`)} />
      <h2 className="steps-content__title">
        {t(`pageData.cart.steps.cart.describe`)}
      </h2>
      <Table
        className="cart-table"
        columns={columnWithLabel()}
        dataSource={carts}
        pagination={false}
      />
      <div className="cart-btns">
        <div className="cart-btns__cost-group">
          <span>{t("pageData.cart.tempPrice")}:</span>
          <span>
            {totalPrice.toLocaleString(currentLang)}
            <sup>VNĐ</sup>
          </span>
        </div>
        <div className="cart-btns__link">
          <Link href="/cart?step=payment">
            <button
              disabled={!carts || !carts.length}
              className="ant-btn ant-btn-primary"
            >
              {t("pageData.cart.order")}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
