import Image from "next/image";
import Link from "next/link";
import { ProductInfo } from "../../../models/Product";
import { ProductActionsGroup } from "./ProductActionsGroup";

import "./product-item.scss";
import React, { useEffect, useState } from "react";
import { ProductLink } from "./ProductLink";
import { ProductPrice } from "./ProductPrice";
import {
  checkIfProductImgExists,
  getProductImage,
} from "../../../helpers/productsFnc";

type ProductItemProps = {
  product: ProductInfo;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const { id, images, name } = product;

  let imgSrc = getProductImage(product);

  return (
    <div id={`product${id}`} className="product-card">
      <ProductLink product={product}>
        <>
          <div className="product-card__describ">
            <div className="product-card__describ--hot"></div>
            <div className="product-card__describ--main-img">
              <Image
                layout="fill"
                src={imgSrc}
                alt={name}
                className="product-card__describ--img"
                quality={100}
                sizes="128px"
              />
            </div>
          </div>
          <h4 className="product-card__title">{name}</h4>
        </>
      </ProductLink>
      <ProductPrice product={product} />
      <ProductActionsGroup btns={["add-cart"]} product={product} />
    </div>
  );
};
