import {ReloadOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import React from "react";
import {MdDeleteForever} from "react-icons/md";
import {useCart} from "../../../hooks/useCart/useCart";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductInfo} from "../../../models/Product";

type ProductRemoveCartProps = {
  product?: Partial<ProductInfo>;
  className?: string;
  disabled?: boolean;
};

export const ProductRemoveCart = ({
  product,
  className = "product-card",
  disabled = false,
}: ProductRemoveCartProps) => {
  const {t} = useTranslation();
  const {removeFromCart} = useCart();

  const onCancel = () => {
    return;
  };

  const onOk = () => {
    removeFromCart(product);
  };

  const handleRemoveProduct = () => {
    Modal.confirm({
      title: !product
        ? t("pageData.cart.removeQuestion.all")
        : t("pageData.cart.removeQuestion.product", {product: product.name}),
      okText: t("pageData.cart.removeBtns.ok"),
      cancelText: t("pageData.cart.removeBtns.cancel"),
      onCancel,
      onOk,
    });
  };

  return (
    <button
      value="removeFromCart"
      onClick={handleRemoveProduct}
      className={`${className}__prod-btns--remove`}
      disabled={disabled}
    >
      {disabled ? <ReloadOutlined spin={true} /> : <MdDeleteForever />}
      <span>{t("pageData.cart.remove")}</span>
    </button>
  );
};
