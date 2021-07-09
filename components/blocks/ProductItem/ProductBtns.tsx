import {ReloadOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {FaCartPlus} from "react-icons/fa";
import {HiMinusSm, HiPlus} from "react-icons/hi";
import {MdAttachMoney, MdDeleteForever} from "react-icons/md";
import {useCart} from "../../../hooks/useCart/useCart";
import {useTranslation} from "../../../hooks/useTranslation/useTranslation";
import {ProductInfo} from "../../../models/Product";

type BtnType = "add-cart" | "payment" | "remove";

type AddRemoveCartProps = {
  product: ProductInfo;
  className?: string;
  defaultCount?: number;
  btns?: BtnType[];
};

export const ProductBtns = ({
  product,
  className = "product-card",
  defaultCount = 1,
  btns = [],
}: AddRemoveCartProps) => {
  const {t} = useTranslation();
  const router = useRouter();
  const {addToCart, removeFromCart} = useCart();

  const [countToCart, setCountToCart] = useState(defaultCount);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncreaseOrDecrease = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const count: number = parseInt(e.currentTarget.value);

    if (countToCart + count > 0) {
      setCountToCart(countToCart + count);
    }
  };

  const onCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const count: number = parseInt(e.currentTarget.value);

    if (count > 0) {
      setCountToCart(count);
    } else {
      setCountToCart(1);
    }
  };

  const handleAddToCart = () => {
    setIsProcessing(true);
    addToCart(product, countToCart);
    setCountToCart(1);
    setIsProcessing(false);
  };

  const handleDirectToPayment = () => {
    handleAddToCart();
    router.push("/payment");
  };

  const handleRemoveFromCard = () => {
    setIsProcessing(true);
    removeFromCart(product);
    setIsProcessing(false);
  };

  return (
    <div className={`${className}__prod-btns`}>
      <div>
        <span>{t("pageData.product.quantity")}</span>
        <div>
          <button
            className={`${className}__prod-btns--sub`}
            value={-1}
            onClick={handleIncreaseOrDecrease}
            disabled={isProcessing}
          >
            <HiMinusSm />
          </button>
          <input
            className={`${className}__prod-btns--count`}
            value={countToCart}
            onChange={onCountChange}
            pattern="^[0–9]$"
            disabled={isProcessing}
          />
          <button
            value={1}
            className={`${className}__prod-btns--add`}
            onClick={handleIncreaseOrDecrease}
            disabled={isProcessing}
          >
            <HiPlus />
          </button>
        </div>
      </div>
      {btns.length ? (
        <div className={`${className}__prod-btns--payment-btn`}>
          {btns.indexOf("add-cart") > -1 ? (
            <button
              value="addToCart"
              onClick={handleAddToCart}
              className={`${className}__prod-btns--add-to-cart`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ReloadOutlined spin={true} />
              ) : (
                <FaCartPlus size="1.2em" />
              )}
              <span>{t("pageData.product.addToCart")}</span>
            </button>
          ) : null}

          {btns.indexOf("payment") > -1 ? (
            <button
              value="addToCart"
              onClick={handleDirectToPayment}
              className={`${className}__prod-btns--pay`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ReloadOutlined spin={true} />
              ) : (
                <MdAttachMoney />
              )}
              <span>{t("pageData.product.pay")}</span>
            </button>
          ) : null}

          {btns.indexOf("remove") > -1 ? (
            <button
              value="addToCart"
              onClick={handleRemoveFromCard}
              className={`${className}__prod-btns--remove`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ReloadOutlined spin={true} />
              ) : (
                <MdDeleteForever />
              )}
              <span>{t("pageData.cart.remove")}</span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
