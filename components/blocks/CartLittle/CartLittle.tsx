import {ShoppingCartOutlined} from "@ant-design/icons";
import {Button, Dropdown} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

import "./cart-litte.scss";
import {CartDropMenu} from "./CartDropMenu";
import Link from "next/link";
import {ProductInCart} from "../../../models/Product";
import {UserContext} from "../../../contexts/userContext/userContext";
import {useContext} from "react";

type CartLittleProps = {
  isMobile: boolean;
};

export const CartLittle = ({isMobile}: CartLittleProps) => {
  const {carts} = useContext(UserContext);

  const totalPrice = (carts || []).reduce(
    (total: number, cartItem: ProductInCart) => {
      const itemPrice = (cartItem.price as unknown as number) * 1;
      return total + itemPrice * cartItem.quantity;
    },
    0
  );

  const {t, currentLang} = useTranslation();
  const screens = useBreakpoint();

  const isSmallestScreen = screens.xs && !screens.sm;

  const totalItems = carts.reduce(
    (summary: number, cartItem: ProductInCart) =>
      (summary += cartItem.quantity),
    0
  );

  return (
    <Dropdown
      overlay={
        isMobile || !carts || !carts.length ? (
          <></>
        ) : (
          <CartDropMenu
            carts={carts}
            totalPrice={Math.floor(totalPrice)}
            addOrRemoveCart={() => {}}
          />
        )
      }
      placement="bottomRight"
    >
      <Button
        className="cart-btn"
        shape="round"
        icon={
          isSmallestScreen ? (
            <></>
          ) : (
            <div className="cart-btn__icon">
              <ShoppingCartOutlined />
              <sup>{totalItems}</sup>
            </div>
          )
        }
        size="large"
      >
        <Link href="/cart">
          <div className="cart-btn-content">
            {!isSmallestScreen && (
              <p className="cart-btn-content__title">
                {t("common.route.cart").toUpperCase()}
              </p>
            )}
            <p className="cart-btn-content__price">
              {Math.floor(totalPrice).toLocaleString(currentLang)}{" "}
              <span>VNĐ</span>
            </p>
          </div>
        </Link>
      </Button>
    </Dropdown>
  );
};
