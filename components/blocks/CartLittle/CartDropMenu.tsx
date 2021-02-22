import Image from "next/image";
import Link from "next/link";
import {calPrice} from "../../../helpers/productsFnc";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {CartActionType, CartItem} from "../../../models/Cart";
import {ProductBase} from "../../../models/Product";

type CartDropProps = {
  totalPrice: number;
  carts: CartItem[];
  addOrRemoveCart: (
    cartAction: CartActionType,
    cartItem: ProductBase | Partial<CartItem>[]
  ) => void;
};

export const CartDropMenu = ({
  totalPrice,
  carts,
  addOrRemoveCart,
}: CartDropProps) => {
  const {t, currentLang} = useTranslation();

  if (!carts || !carts.length) return null;

  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown__list">
        {(carts || []).map((cartItem: CartItem) => {
          const {name, id, images, price, discount = 0, count} = cartItem;
          const realPrice = calPrice(price, discount);

          if (!count) return null;

          return (
            <div key={`cart-little${id}`} className="cart-dropdown__list-item">
              <Link href={`/product/${id}`}>
                <a className="cart-dropdown__item-body">
                  <div className="cart-dropdown__item-img-wrapper">
                    <div className="cart-dropdown__item-img">
                      <Image src={images[0]} layout="fill" />
                    </div>
                  </div>
                  <div className="cart-dropdown__item-content">
                    <h4 className="cart-dropdown__item-title">{name}</h4>
                    <p className="cart-dropdown__item-price">
                      {count} x {realPrice.toLocaleString(currentLang)} VNĐ
                    </p>
                  </div>
                </a>
              </Link>
              <div className="cart-dropdown__cancel-btn">
                <button onClick={() => addOrRemoveCart("remove", cartItem)}>
                  X
                </button>
              </div>
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
      <div className="cart-dropdown__btns">
        <Link href="/cart">
          <a className="cart-dropdown__btns--cart">{t("common.route.cart")}</a>
        </Link>
        <Link href="/payment">
          <a className="cart-dropdown__btns--pay">
            {t("common.route.payment")}
          </a>
        </Link>
      </div>
    </div>
  );
};
