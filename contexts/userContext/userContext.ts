import {ProductBase} from "./../../models/Product";
import {createContext} from "react";

export const UserContext = createContext({
  carts: {
    productIds: [],
    price: 0,
  },
  productsList: [] as ProductBase[],
  storeProductsData: (products: ProductBase[]) => {
    console.log({products});
  },
});
