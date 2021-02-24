import {ProductBase} from "./Product";

export type CatProdListProps = {
  products: {
    [key in string]: ProductBase[];
  };
};

export type HomeProps = {
  products: ProductBase[];
  prdData: any;
};

export type ComboProps = {
  combos: ProductBase[];
};
