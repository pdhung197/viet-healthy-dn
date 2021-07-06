import {ProductInCart, ProductInfo} from "./../../models/Product";
import {ProductDataItem} from "../../models/Product";
import {returnData} from "../../helpers/common";
import {CartsStore} from "../../models/Cart";

export const useCart = () => {
  const addToCart = (product: ProductInfo, quantity: number) => {
    try {
      const dataCart: ProductInCart[] = JSON.parse(
        window.localStorage.getItem(CartsStore.name) || "[]"
      );
      const {
        id,
        name,
        slug,
        images,
        price,
        regular_price,
        sale_price,
        variations,
        description,
      } = product;
      const productExistsInCartIndex = dataCart.findIndex(
        (prd: ProductInCart) => prd.id === id
      );
      if (productExistsInCartIndex > -1) {
        dataCart[productExistsInCartIndex].quantity =
          dataCart[productExistsInCartIndex].quantity + quantity;
      } else {
        dataCart.push({
          id,
          name,
          slug,
          images,
          price,
          regular_price,
          sale_price,
          variations,
          description,
          quantity,
        });
      }

      return returnData(dataCart, true);
    } catch (error) {
      return returnData(error.message, false);
    }
  };

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
