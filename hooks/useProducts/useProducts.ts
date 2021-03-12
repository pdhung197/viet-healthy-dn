import {CartItem} from "./../../models/Cart";
import {calPrice} from "./../../helpers/productsFnc";
import {useContext, useState} from "react";
import {UserContext} from "../../contexts/userContext/userContext";
import {CartActionType} from "../../models/Cart";
import {ProductDataItem} from "../../models/Product";
import {useLazyQuery} from "@apollo/client";
import {GET_CART} from "../../utils/gql/gqlQuery";

export const getProductOnRequest = (productId: string) => {
  const [getProductInfo, {loading, data}] = useLazyQuery(GET_CART);

  return {
    getProductInfo,
    loading,
    data,
  };
};

export const useProducts = () => {
  const {carts, addToCart, removeFromCart} = useContext(UserContext);
  const [countToCart, setCountToCart] = useState(1);

  const totalPrice = (carts || []).reduce(
    (total: number, cartItem: CartItem) => {
      const itemPrice = calPrice(cartItem.price, cartItem.discount || 0);
      return total + itemPrice * cartItem.count;
    },
    0
  );

  const addOrRemoveCart = (
    cartAction: CartActionType,
    product: ProductDataItem | Partial<CartItem>[]
  ) => {
    switch (cartAction) {
      case "add":
        addToCart(product as ProductDataItem);
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

  return {
    carts,
    totalPrice: Math.floor(totalPrice),
    addOrRemoveCart,
    handleIncreaseOrDecrease,
    onCountChange,
    countToCart,
  };
};
