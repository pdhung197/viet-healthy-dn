import {CartItem} from "./../../models/Cart";
import {ProductDataItem} from "./../../models/Product";
import {createContext} from "react";

export const UserContext = createContext({
  carts: [] as CartItem[],
  addToCart: (product: ProductDataItem) => {
    console.log({product});
  },
  removeFromCart: (products: Partial<CartItem>[]) => {
    console.log({products});
  },
  productsList: [] as ProductDataItem[],
  storeProductsData: (products: ProductDataItem[]) => {
    console.log({products});
  },
});
