import Image from "next/image";
import Link from "next/link";
import { ProductInfo } from "../../../models/Product";
import { ProductActionsGroup } from "./ProductActionsGroup";

import "./product-item.scss";
import React, { useEffect, useState } from "react";
import { ProductLink } from "./ProductLink";
import { ProductPrice } from "./ProductPrice";
import { checkIfProductImgExists } from "../../../helpers/productsFnc";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

type ProductItemProps = {
  product: ProductInfo;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const { id, images, name } = product;
  const screens = useBreakpoint();

  const isSmallestScreen = screens.xs && !screens.sm;

  let imgSrc = `${process.env.NEXT_PUBLIC_PAGE_URL}wp-content/uploads/2021/05/LogoTransThumb.png`;

  if (
    !(
      !images ||
      !images.length ||
      !images[0] ||
      images[0].src.includes("woocommerce-placeholder")
    )
  ) {
    const imgSrcs = images[0].src.split(".");

    imgSrc = `${imgSrcs.slice(0, imgSrcs.length - 1).join(".")}-${
      isSmallestScreen ? "200x200" : "300x300"
    }.${imgSrcs[imgSrcs.length - 1]}`;
  }

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
