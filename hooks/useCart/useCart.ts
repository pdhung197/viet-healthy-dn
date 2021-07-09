import {useTranslation} from "./../useTranslation/useTranslation";
import {UserContext} from "./../../contexts/userContext/userContext";
import {useContext} from "react";
import {ProductInCart, ProductInfo} from "./../../models/Product";
import {openNotificationWithIcon} from "../../components/blocks/Notification/Notification";

export const useCart = () => {
  const {carts, updateCartToContextAndLocalStorage} = useContext(UserContext);
  const {t} = useTranslation();

  const addToCart = (product: ProductInfo, quantity: number) => {
    try {
      const {id} = product;
      const productExistsInCartIndex = carts.findIndex(
        (prd: ProductInCart) => prd.id === id
      );
      if (productExistsInCartIndex > -1) {
        updateCartToContextAndLocalStorage([
          ...carts.slice(0, productExistsInCartIndex),
          {
            ...carts[productExistsInCartIndex],
            quantity: carts[productExistsInCartIndex].quantity + quantity,
          },
          ...carts.slice(productExistsInCartIndex + 1),
        ]);
      } else {
        updateCartToContextAndLocalStorage([
          ...carts,
          {
            ...product,
            quantity,
          },
        ]);
      }

      openNotificationWithIcon({
        notifiType: "success",
        message: t("notifications.carts.addSuccessTitle"),
        description: t("notifications.carts.addSuccess", {
          product: quantity + " " + product.name,
        }),
      });
    } catch (error) {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.addFailTitle"),
        description: t("notifications.carts.addFail", {product: product.name}),
      });
    }
  };

  const removeFromCart = (product: Partial<ProductInfo>) => {
    const productExistsInCartIndex = carts.findIndex(
      (prd: ProductInCart) => prd.id === product.id
    );

    if (productExistsInCartIndex > -1) {
      try {
        updateCartToContextAndLocalStorage([
          ...carts.slice(0, productExistsInCartIndex),
          ...carts.slice(productExistsInCartIndex + 1),
        ]);

        openNotificationWithIcon({
          notifiType: "success",
          message: t("notifications.carts.removeSuccessTitle"),
          description: t("notifications.carts.removeSuccess", {
            product: product.name,
          }),
        });
      } catch {
        openNotificationWithIcon({
          notifiType: "error",
          message: t("notifications.carts.removeFailTitle"),
          description: t("notifications.carts.removeFail", {
            product: product.name,
          }),
        });
      }
    }
  };

  const updateProductToCart = (
    productWithQuantity: ProductInCart,
    type: "add" | "remove"
  ) => {};

  const getCart = () => {};

  const updateCartToContext = () => {};

  return {
    addToCart,
    removeFromCart,
  };
};
