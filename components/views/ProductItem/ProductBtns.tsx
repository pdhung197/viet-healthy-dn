import {ReloadOutlined} from "@ant-design/icons";
import React from "react";
import {FaCartPlus} from "react-icons/fa";
import {MdAttachMoney} from "react-icons/md";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {BtnType, ProductInfo} from "../../../models/Product";
import {ProductRemoveCart} from "./ProductRemoveCart";

type ProductBtnsProps = {
  className?: string;
  btns: BtnType[];
  isProccesing?: boolean;
  handleAddToCart?: () => void;
  handleDirectToPayment?: () => void;
  product: ProductInfo;
};

export const ProductBtns = ({
  className = "product-card",
  btns,
  isProccesing = false,
  handleAddToCart = () => {},
  handleDirectToPayment = () => {},
  product,
}: ProductBtnsProps) => {
  const {t} = useTranslation();

  return (
    <div className={`${className}__prod-btns--payment-btn`}>
      {btns.indexOf("add-cart") > -1 ? (
        <button
          value="addToCart"
          onClick={handleAddToCart}
          className={`${className}__prod-btns--add-to-cart`}
          disabled={isProccesing}
        >
          {isProccesing ? (
            <ReloadOutlined spin={true} />
          ) : (
            <FaCartPlus size="1.2em" />
          )}
          <span>{t("pageData.product.addToCart")}</span>
        </button>
      ) : null}

      {btns.indexOf("payment") > -1 ? (
        <button
          value="addToCart"
          onClick={handleDirectToPayment}
          className={`${className}__prod-btns--pay`}
          disabled={isProccesing}
        >
          {isProccesing ? <ReloadOutlined spin={true} /> : <MdAttachMoney />}
          <span>{t("pageData.product.pay")}</span>
        </button>
      ) : null}

      {btns.indexOf("remove") > -1 ? (
        <ProductRemoveCart product={product} className={className} />
      ) : null}
    </div>
  );
};
