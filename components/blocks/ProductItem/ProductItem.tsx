import Image from "next/image";
import Link from "next/link";
import React from "react";
import {calPrice} from "../../../helpers/productsFnc";
import {ProductBase} from "../../../models/Product";
import {ProductBtns} from "./ProductBtns";
import {useProducts} from "../../../hooks/useProducts/useProducts";

import "./product-item.scss";
import {CartItem} from "../../../models/Cart";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

type ProductItem = {
  product: ProductBase;
};

export const ProductItem = ({product}: ProductItem) => {
  const {currentLang} = useTranslation();
  const {addOrRemoveCart, carts} = useProducts();
  const {id, name, images, price, discount = 0} = product;
  const currentPrice = calPrice(price, discount);
  const productInCart = carts.find((cartItem: CartItem) => cartItem.id === id);
  const countInCart = productInCart?.count || 0;

  return (
    <div id={`product${id}`} className="product-card">
      <Link href={`/product/${id}`}>
        <a>
          <div className="product-card__describ">
            <div className="product-card__describ--hot"></div>
            <div className="product-card__describ--main-img">
              <Image
                layout="fill"
                src={images[0]}
                alt={name}
                className="product-card__describ--img"
              />
            </div>
          </div>
          <h4 className="product-card__title">{name}</h4>
        </a>
      </Link>
      <h5 className="product-card__price">
        {discount > 0 && <del>{price.toLocaleString(currentLang)}</del>}
        <span>{currentPrice.toLocaleString(currentLang)} VNĐ</span>
      </h5>
      <div className="product-card__prod-btns">
        <ProductBtns
          product={product}
          handleAddRemoveCart={addOrRemoveCart}
          countInCart={countInCart}
        />
      </div>
    </div>
  );
};
