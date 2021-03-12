import {useEffect, useState} from "react";
import {openNotificationWithIcon} from "../../components/blocks/Notification/Notification";
import {useTranslation} from "../../hooks/useTranslation/useTranslation";
import {CartItem} from "../../models/Cart";
import {CommonProps} from "../../models/Common";
import {ProductBase} from "../../models/Product";
import {UserContext} from "./userContext";

export const UserProvider = ({children}: CommonProps) => {
  const {t} = useTranslation();
  const [productsList, setProducts] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(() => {
    if (
      (!carts || !carts.length) &&
      window &&
      window.localStorage.getItem("carts")
    ) {
      setCarts(JSON.parse(window.localStorage.getItem("carts") || ""));
    }
  }, []);

  const updateCartToLocalStorage = (updateCarts: any[]) => {
    if (window) {
      window.localStorage.setItem("carts", JSON.stringify(updateCarts));
    }
  };

  const storeProductsData = (products: any[]) => setProducts(products);

  const addToCart = (product: any) => {
    /* try {
      const indexProductInCart = carts.findIndex(
        (cartItem: any) => cartItem.id === product.id
      );
      if (indexProductInCart > -1) {
        const updatedExistsItem = [
          ...carts.slice(0, indexProductInCart),
          {
            ...product,
            count: carts[indexProductInCart].count + 1,
          },
          ...carts.slice(indexProductInCart + 1),
        ];

        updateCartToLocalStorage(updatedExistsItem);

        setCarts(updatedExistsItem);
      } else {
        const updatedCart = [
          ...carts,
          {
            ...product,
            count: 1,
          },
        ];

        updateCartToLocalStorage(updatedCart);

        setCarts(updatedCart);
      }

      openNotificationWithIcon({
        notifiType: "success",
        message: t("notifications.carts.addSuccessTitle"),
        description: t("notifications.carts.addSuccess", {
          product: product.name,
        }),
      });
    } catch (error) {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.addFailTitle"),
        description: t("notifications.carts.addFail", {product: product.name}),
      });
    } */
  };

  const removeFromCart = (products: Partial<any>[]) => {
    /* try {
      let isCartUpdated = false;
      const updatedCart = products.reduce(
        (newCart: any[], product: Partial<any>) => {
          const {id, count = 1} = product;
          const indexProductInCart = newCart.findIndex(
            (cartItem: any) => cartItem.id === id
          );
          if (
            indexProductInCart < 0 ||
            newCart[indexProductInCart].count === 0
          ) {
            return newCart;
          }

          const prodCountIntCart = newCart[indexProductInCart].count;
          isCartUpdated = true;
          return [
            ...newCart.slice(0, indexProductInCart),
            {
              ...newCart[indexProductInCart],
              count: count > prodCountIntCart ? 0 : prodCountIntCart - count,
            },
            ...newCart.slice(indexProductInCart + 1),
          ];
        },
        carts
      );

      if (!isCartUpdated) {
        return;
      }

      const filteredUpdatedCart = updatedCart.filter(
        (cartItem: any) => cartItem.count > 0
      );

      updateCartToLocalStorage(filteredUpdatedCart);

      setCarts(filteredUpdatedCart);

      openNotificationWithIcon({
        notifiType: "warning",
        message: t("notifications.carts.removeSuccessTitle"),
        description: t("notifications.carts.removeSuccess", {
          product: products[0].name,
        }),
      });
    } catch (error) {
      openNotificationWithIcon({
        notifiType: "error",
        message: t("notifications.carts.removeFailTitle"),
        description: t("notifications.carts.removeFail", {
          product: products[0].name,
        }),
      });
    } */
  };

  const providerValue = {
    carts,
    productsList,
    storeProductsData,
    addToCart,
    removeFromCart,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
