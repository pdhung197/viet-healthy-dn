import {ProductBase, ProductDataItem} from "./Product";

export type CatProdListProps = {
  products: {
    [key in string]: ProductBase[];
  };
  prdData?: ProductDataItem[];
};

export type HomeProps = {
  products: ProductBase[];
  prdData: any;
};

export type ComboProps = {
  combos: ProductBase[];
};
