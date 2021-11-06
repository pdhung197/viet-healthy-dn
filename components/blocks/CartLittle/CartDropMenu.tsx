import Link from "next/link";
import React from "react";
import { getProductImage } from "../../../helpers/productsFnc";
import { useCart } from "../../../hooks/useCart/useCart";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ProductInCart } from "../../../models/Product";
import { ProductLink } from "../../views/ProductItem/ProductLink";

type CartDropProps = {
  totalPrice: number;
  carts: ProductInCart[];
  showRemoveBtn?: boolean;
};

export const CartDropMenu = ({
  totalPrice,
  carts,
  showRemoveBtn = true,
}: CartDropProps) => {
  const { t, currentLang } = useTranslation();
  const { removeFromCart } = useCart();

  if (!carts || !carts.length) return null;

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__list">
        {(carts || []).map((cartItem: ProductInCart) => {
          const { quantity, ...product } = cartItem;
          const { name, id, images, price } = product;

          if (!quantity) return null;

          return (
            <div key={`cart-little${id}`} className="cart-dropdown__list-item">
              <ProductLink product={product}>
                <a className="cart-dropdown__item-body">
                  <div className="cart-dropdown__item-img-wrapper">
                    <div className="cart-dropdown__item-img">
                      <img src={getProductImage(product)} />
                    </div>
                  </div>
                  <div className="cart-dropdown__item-content">
                    <h4 className="cart-dropdown__item-title">{name}</h4>
                    <p className="cart-dropdown__item-price">
                      {quantity} x{" "}
                      {((price as unknown as number) * 1).toLocaleString(
                        currentLang
                      )}{" "}
                      VNĐ
                    </p>
                  </div>
                </a>
              </ProductLink>
              {showRemoveBtn && (
                <div className="cart-dropdown__cancel-btn">
                  <button onClick={() => removeFromCart(product)}>X</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <hr />
      <div className="cart-dropdown__total">
        <span className="cart-dropdown__total--title">
          {t("pageData.product.total")}:
        </span>
        <span className="cart-dropdown__total--value">
          {totalPrice.toLocaleString(currentLang)} VNĐ
        </span>
      </div>
      {showRemoveBtn && (
        <div className="cart-dropdown__btns">
          <Link href="/cart?step=cart">
            <a className="cart-dropdown__btns--cart">
              {t("common.route.cart")}
            </a>
          </Link>
          <Link href="/cart?step=payment">
            <a className="cart-dropdown__btns--pay">
              {t("common.route.payment")}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};
