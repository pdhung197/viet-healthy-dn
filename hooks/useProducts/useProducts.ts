import {CartItem} from "./../../models/Cart";
import {calPrice} from "./../../helpers/productsFnc";
import {useContext} from "react";
import {UserContext} from "../../contexts/userContext/userContext";
import {CartActionType} from "../../models/Cart";
import {ProductBase} from "../../models/Product";

export const useProducts = () => {
  const {carts, addToCart, removeFromCart} = useContext(UserContext);

  const totalPrice = (carts || []).reduce(
    (total: number, cartItem: CartItem) => {
      const itemPrice = calPrice(cartItem.price, cartItem.discount || 0);
      return total + itemPrice * cartItem.count;
    },
    0
  );

  const addOrRemoveCart = (
    cartAction: CartActionType,
    product: ProductBase | Partial<CartItem>[]
  ) => {
    switch (cartAction) {
      case "add":
        addToCart(product as ProductBase);
        return;
      case "remove":
        removeFromCart(
          ((product instanceof Array
            ? product
            : [product]) as unknown) as Partial<CartItem>[]
        );
        return;
      default:
        return;
    }
  };

  return {
    carts,
    totalPrice: Math.floor(totalPrice),
    addOrRemoveCart,
  };
};
