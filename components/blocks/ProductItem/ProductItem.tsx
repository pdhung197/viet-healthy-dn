import Image from "next/image";
import Link from "next/link";
import {ProductInfo} from "../../../models/Product";
import {ProductBtns} from "./ProductBtns";

import "./product-item.scss";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import React from "react";
import {ProductLink} from "./ProductLink";
import {ProductPrice} from "./ProductPrice";

type ProductItemProps = {
  product: ProductInfo;
};

export const ProductItem = ({product}: ProductItemProps) => {
  const {t} = useTranslation();

  const {id, images, name} = product;

  return (
    <div id={`product${id}`} className="product-card">
      <ProductLink product={product}>
        <>
          <div className="product-card__describ">
            <div className="product-card__describ--hot"></div>
            <div className="product-card__describ--main-img">
              <Image
                layout="fill"
                src={
                  !images ||
                  !images.length ||
                  !images[0] ||
                  images[0].src.includes("woocommerce-placeholder")
                    ? `${process.env.NEXT_PUBLIC_PAGE_URL}wp-content/uploads/2021/05/LogoTransThumb.png`
                    : images[0].src
                }
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
      <ProductBtns btns={["add-cart"]} product={product} />
    </div>
  );
};
