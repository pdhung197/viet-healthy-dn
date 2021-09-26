import React from "react";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductInfo} from "../../../models/Product";

type ProductPriceProps = {
  product: ProductInfo;
  className?: string;
};

export const ProductPrice = ({
  product,
  className = "product-card",
}: ProductPriceProps) => {
  const {sale_price, regular_price, price} = product;
  const {currentLang} = useTranslation();

  return (
    <h5 className={`${className}__price`}>
      {sale_price && (
        <del>
          {((regular_price as unknown as number) / 1 || 0).toLocaleString(
            currentLang
          )}
        </del>
      )}
      <span>
        {((price as unknown as number) / 1 || 0).toLocaleString(currentLang)}{" "}
        <sup>VNĐ</sup>
      </span>
    </h5>
  );
};
