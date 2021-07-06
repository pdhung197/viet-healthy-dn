import React from "react";
import {ProductInfo} from "../../../models/Product";

type ProductShareProps = {
  product: ProductInfo;
  className?: string;
};

export const ProductShare = ({
  product,
  className = "product-share",
}: ProductShareProps) => {
  return <div className={`${className}`}>Component Content</div>;
};
