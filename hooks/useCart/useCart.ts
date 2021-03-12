import {ProductDataItem} from "../../models/Product";

export const useCart = () => {
  const addProductToCart = (product: ProductDataItem, goToCart = false) => {
    console.log("Add", {product});
  };

  const removeProductFromCart = (product: ProductDataItem) => {
    console.log("Remove", {product});
  };

  return {
    addProductToCart,
    removeProductFromCart,
  };
};
