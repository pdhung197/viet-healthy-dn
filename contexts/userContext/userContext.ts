import {CartItem} from "./../../models/Cart";
import {ProductBase} from "./../../models/Product";
import {createContext} from "react";

export const UserContext = createContext({
  carts: [] as CartItem[],
  addToCart: (product: ProductBase) => {
    console.log({product});
  },
  removeFromCart: (products: Partial<CartItem>[]) => {
    console.log({products});
  },
  productsList: [] as ProductBase[],
  storeProductsData: (products: ProductBase[]) => {
    console.log({products});
  },
});
