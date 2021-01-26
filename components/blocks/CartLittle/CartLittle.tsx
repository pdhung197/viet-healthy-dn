import {ShoppingCartOutlined} from "@ant-design/icons";
import {Button, Dropdown, Menu} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";

import "./cart-litte.scss";

type CartLittleProps = {
  isMobile: boolean;
};

const menu = <div>Menu</div>;

export const CartLittle = ({isMobile}: CartLittleProps) => {
  const {t} = useTranslation();
  const screens = useBreakpoint();

  const isSmallestScreen = screens.xs && !screens.sm;

  return (
    <Dropdown overlay={isMobile ? <></> : menu} placement="bottomRight">
      <Button
        className="cart-btn"
        shape="round"
        icon={isSmallestScreen ? <></> : <ShoppingCartOutlined />}
        size="large"
      >
        <div className="cart-btn-content">
          {!isSmallestScreen && (
            <p className="cart-btn-content__title">
              {t("common.route.cart").toUpperCase()}
            </p>
          )}
          <p className="cart-btn-content__price">
            31.357.000 <span>Đ</span>
          </p>
        </div>
      </Button>
    </Dropdown>
  );
};
