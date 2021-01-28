import Image from "next/image";
import Link from "next/link";
import React from "react";
import {ProductBase} from "../../../models/Product";
import {AddProdToCart} from "./AddProdToCart";

import "./product-item.scss";

type ProductItem = {
  product: ProductBase;
};

export const ProductItem = ({product}: ProductItem) => {
  const {id, name, images, price, discount = 0} = product;
  const currentPrice = (price * (100 - discount)) / 100;

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
        {discount > 0 && <del>{price}</del>}
        <span>{currentPrice} VND</span>
      </h5>
      <div className="product-card__add-cart-btn">
        <AddProdToCart />
      </div>
      <div className="product-card__buy-btn"></div>
    </div>
  );
};
