import {ProductInCart, ProductInfo} from "./../../models/Product";
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
  const {carts} = useContext(UserContext);

  const addProductToCart = (product: ProductInfo) => {
    /* setIsProcessing(true);
    const processData: ReturnData = addToCart(product, countToCart);

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
          product: countToCart + " " + product.name,
        }),
      });
    } else {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.addFailTitle"),
        description: t("notifications.carts.addFail", {product: product.name}),
      });
    } */
  };

  return {
    carts,
    addProductToCart,
  };
};
