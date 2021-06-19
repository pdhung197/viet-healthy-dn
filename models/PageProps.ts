import {CategoryInfo} from "./Category";
import {
  ProductBase,
  ProductDataItem,
  ProductInfo,
  ProductListByCatInfo,
} from "./Product";

export type CatProdListProps = {
  productList: ProductListByCatInfo;
};

export interface HomeProps {
  productsList: ProductInfo[];
  categoryList: CategoryInfo[];
}

export type ComboProps = {
  combos: ProductBase[];
};

export interface ProductsProps {
  productsList: ProductInfo[];
  categoryList: CategoryInfo[];
}
