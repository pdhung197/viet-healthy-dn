import {ProductDataItem} from "../../models/Product";
import {mutationAddCart} from "../../services/cartSv/cartMutate";

export const useCart = () => {
  const addToCart = (product: ProductDataItem, quantity: number) =>
    mutationAddCart(product, quantity);

  const removeFromCart = (product: ProductDataItem) => {
    console.log("Remove", {product});
  };

  const getCart = () => {};

  const updateCartToContext = () => {};

  return {
    addToCart,
    removeFromCart,
  };
};
