import {
  ProductBase,
  ProductDataItem,
  ProductInfo,
  ProductListByCatInfo,
} from "./Product";

export type CatProdListProps = {
  productList: ProductListByCatInfo;
};

export type HomeProps = {
  productsList: ProductInfo[];
};

export type ComboProps = {
  combos: ProductBase[];
};

export type ProductsProps = {
  productsList: ProductInfo[];
};
