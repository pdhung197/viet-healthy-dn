import {CategoryInfo} from "./../../models/Category";
import {ProductInfo} from "./../../models/Product";
import {createContext} from "react";

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
  storeCategoryList: (categoryList: CategoryInfo[]) => {
    console.log({categoryList});
  },
  updateCartToContextAndLocalStorage: (updateCart: any[]) => {
    console.log({updateCart});
  },
});
