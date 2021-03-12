import {CartItem} from "./../../models/Cart";
import {ProductDataItem} from "./../../models/Product";
import {createContext} from "react";

export const UserContext = createContext({
  carts: [] as any[],
  addToCart: (product: any) => {
    console.log({product});
  },
  removeFromCart: (products: Partial<any>[]) => {
    console.log({products});
  },
  productsList: [] as any[],
  storeProductsData: (products: any[]) => {
    console.log({products});
  },
});
