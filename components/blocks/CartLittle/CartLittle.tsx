import {ShoppingCartOutlined} from "@ant-design/icons";
import {Button, Dropdown} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

import "./cart-litte.scss";
import {CartDropMenu} from "./CartDropMenu";
import {ProductInCart} from "../../../models/Product";
import {UserContext} from "../../../contexts/userContext/userContext";
import {useContext} from "react";
import {useRouter} from "next/router";
import {calculateCartPrice} from "../../../helpers/productsFnc";

type CartLittleProps = {
  isMobile: boolean;
};

export const CartLittle = ({isMobile}: CartLittleProps) => {
  const {carts} = useContext(UserContext);
  const router = useRouter();

  const totalPrice = calculateCartPrice(carts);

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
          <CartDropMenu carts={carts} totalPrice={Math.floor(totalPrice)} />
        )
      }
      placement="bottomRight"
    >
      <Button
        className="cart-btn"
        shape="round"
        onClick={() => router.push("/cart?step=cart")}
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
      </Button>
    </Dropdown>
  );
};
