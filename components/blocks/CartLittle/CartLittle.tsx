import {ShoppingCartOutlined} from "@ant-design/icons";
import {Button, Dropdown} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {useProducts} from "../../../hooks/useProducts/useProducts";

import "./cart-litte.scss";
import {CartDropMenu} from "./CartDropMenu";
import Link from "next/link";
import {CartItem} from "../../../models/Cart";

type CartLittleProps = {
  isMobile: boolean;
};

export const CartLittle = ({isMobile}: CartLittleProps) => {
  const {carts, totalPrice} = useProducts();

  const {t, currentLang} = useTranslation();
  const screens = useBreakpoint();

  const isSmallestScreen = screens.xs && !screens.sm;

  const totalItems = carts.reduce(
    (summary: number, cartItem: CartItem) => (summary += cartItem.quantity),
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
            totalPrice={totalPrice}
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
              {totalPrice.toLocaleString(currentLang)} <span>VNĐ</span>
            </p>
          </div>
        </Link>
      </Button>
    </Dropdown>
  );
};
