import {CategoryInfo} from "./../../models/Category";
import {ProductInCart, ProductInfo} from "./../../models/Product";
import {createContext} from "react";

export const UserContext = createContext({
  carts: [] as ProductInCart[],
  productsList: [] as ProductInfo[],
  storeProductsData: (products: any[]) => {
    console.log({products});
  },
  categoryList: [] as CategoryInfo[],
  storeCategoryList: (categoryList: CategoryInfo[]) => {
    console.log({categoryList});
  },
  updateCartToContextAndLocalStorage: (updateCart: ProductInCart[]) => {
    console.log({updateCart});
  },
  productDetail: {} as ProductInfo,
  storeProductDetail: (product: ProductInfo) => {
    console.log({product});
  },
});
