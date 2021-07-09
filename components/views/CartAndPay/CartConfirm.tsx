import React, {useContext} from "react";
import {Table} from "antd";
import {UserContext} from "../../../contexts/userContext/userContext";
import {cartColumns, cartColumnsDesktop} from "./CartColums";
import {ProductInCart} from "../../../models/Product";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {MdDeleteForever} from "react-icons/md";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {TableColumn} from "../../../models/Common";

const DeleteButton = ({
  product,
  onRemove = () => {},
}: {
  product?: ProductInCart;
  onRemove?: (productId: "all" | string | number) => void;
}) => {
  const {t} = useTranslation();
  const productId = product?.id || "all";

  return (
    <button
      className="cart-cell__action cart-cell__action--remove"
      onClick={() => onRemove(productId)}
    >
      <MdDeleteForever /> <label>{t("pageData.cart.remove")}</label>
    </button>
  );
};

export const CartConfirm = () => {
  const {carts} = useContext(UserContext);
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const handleRemoveProducts = (productId: "all" | string | number) => {
    console.log({productId});
  };

  const column: TableColumn[] = [...cartColumns];

  if (!isMobile) {
    column.push(...cartColumnsDesktop, {
      title: () => <DeleteButton onRemove={handleRemoveProducts} />,
      dataIndex: "remove",
      key: "remove",
      render: (text: string, cartItem: ProductInCart) => (
        <DeleteButton product={cartItem} onRemove={handleRemoveProducts} />
      ),
    });
  }

  return (
    <Table
      className="cart-table"
      columns={column}
      dataSource={carts}
      pagination={false}
    />
  );
};
