import {ProductBase} from "./Product";

export type CatProdListProps = {
  products: {
    [key in string]: ProductBase[];
  };
  prdData?: any;
};

export type HomeProps = {
  products: ProductBase[];
  prdData: any;
};

export type ComboProps = {
  combos: ProductBase[];
};
