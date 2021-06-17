import {ProductInfo} from "./../../models/Product";
import {useCart} from "./../useCart/useCart";
import {useTranslation} from "./../useTranslation/useTranslation";
import {ReturnData} from "./../../models/Common";
import {CartItem} from "./../../models/Cart";
import {calPrice} from "./../../helpers/productsFnc";
import {useContext, useState} from "react";
import {UserContext} from "../../contexts/userContext/userContext";
import {CartActionType} from "../../models/Cart";
import {ProductDataItem} from "../../models/Product";
import {useLazyQuery} from "@apollo/client";
import {GET_CART} from "../../utils/gql/gqlQuery";
import {openNotificationWithIcon} from "../../components/blocks/Notification/Notification";

export const getProductOnRequest = (productId: string) => {
  const [getProductInfo, {loading, data}] = useLazyQuery(GET_CART);

  return {
    getProductInfo,
    loading,
    data,
  };
};

export const useProducts = () => {
  const {t} = useTranslation();
  const {carts, updateCartToContextAndLocalStorage} = useContext(UserContext);
  const {addToCart} = useCart();
  const [countToCart, setCountToCart] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = (carts || []).reduce(
    (total: number, cartItem: CartItem) => {
      const itemPrice = (cartItem.price as unknown as number) * 1;
      return total + itemPrice * cartItem.quantity;
    },
    0
  );

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

  const addProductToCart = (product: ProductInfo) => {
    setIsProcessing(true);
    const processData: ReturnData = addToCart(product, countToCart);
    console.log({processData});
    const {ok, data, error} = processData;
    if (updateCartToContextAndLocalStorage) {
      updateCartToContextAndLocalStorage(data);
    }
    setIsProcessing(false);
    setCountToCart(1);

    if (ok) {
      openNotificationWithIcon({
        notifiType: "success",
        message: t("notifications.carts.addSuccessTitle"),
        description: t("notifications.carts.addSuccess", {
          product: product.name,
        }),
      });
    } else {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.addFailTitle"),
        description: t("notifications.carts.addFail", {product: product.name}),
      });
    }
  };

  return {
    carts,
    totalPrice: Math.floor(totalPrice),
    handleIncreaseOrDecrease,
    onCountChange,
    countToCart,
    isProcessing,
    addProductToCart,
  };
};
