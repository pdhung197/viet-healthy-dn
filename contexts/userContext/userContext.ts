import {CartItem} from "./../../models/Cart";
import {ProductDataItem, ProductInfo} from "./../../models/Product";
import {createContext} from "react";
import {CategoryInfo} from "../../models/Category";

export const UserContext = createContext({
  carts: [] as any[],
  addToCart: (product: any) => {
    console.log({product});
  },
  removeFromCart: (products: Partial<any>[]) => {
    console.log({products});
  },
  productsList: [] as ProductInfo[],
  storeProductsData: (products: any[]) => {
    console.log({products});
  },
  categoryList: [] as CategoryInfo[],
  updateCartToContextAndLocalStorage: (updateCart: any[]) => {
    console.log({updateCart});
  },
});
