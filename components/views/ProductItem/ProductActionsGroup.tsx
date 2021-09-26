import {ReloadOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {FaCartPlus} from "react-icons/fa";
import {HiMinusSm, HiPlus} from "react-icons/hi";
import {MdAttachMoney, MdDeleteForever} from "react-icons/md";
import {useCart} from "../../../hooks/useCart/useCart";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {BtnType, ProductInfo} from "../../../models/Product";
import {ProductBtns} from "./ProductBtns";
import {ProductQuantity} from "./ProductQuantity";
import {ProductRemoveCart} from "./ProductRemoveCart";

type AddRemoveCartProps = {
  product: ProductInfo;
  className?: string;
  defaultCount?: number;
  btns?: BtnType[];
};

export const ProductActionsGroup = ({
  product,
  className = "product-card",
  defaultCount = 1,
  btns = [],
}: AddRemoveCartProps) => {
  const {t} = useTranslation();
  const router = useRouter();
  const {addToCart} = useCart();

  const [countToCart, setCountToCart] = useState(defaultCount);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncreaseOrDecrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const count: number = parseInt(e.currentTarget.value);

    if (countToCart + count > 0) {
      setCountToCart(countToCart + count);
    }
  };

  const handleCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const count: number = parseInt(e.currentTarget.value);

    if (count > 0) {
      setCountToCart(count);
    } else {
      setCountToCart(1);
    }
  };

  const handleAddToCart = () => {
    setIsProcessing(true);
    addToCart(product, countToCart);
    setCountToCart(1);
    setIsProcessing(false);
  };

  const handleDirectToPayment = () => {
    handleAddToCart();
    router.push("/payment");
  };

  return (
    <div className={`${className}__prod-btns`}>
      <div>
        <span>{t("pageData.product.quantity")}</span>
        <ProductQuantity
          className={className}
          isLoading={isProcessing}
          quantity={countToCart}
          handleAdjustBtnClick={handleIncreaseOrDecrease}
          handleAdjustInputChange={handleCountChange}
        />
      </div>
      {btns.length ? (
        <ProductBtns
          product={product}
          isProccesing={isProcessing}
          handleAddToCart={handleAddToCart}
          handleDirectToPayment={handleDirectToPayment}
          btns={btns}
        />
      ) : null}
    </div>
  );
};
