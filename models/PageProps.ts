import { CategoryInfo } from "./Category";
import { ProductBase, ProductInfo, ProductListByCatInfo } from "./Product";

export enum PageKeys {
  home = "home",
  products = "products",
  combo = "combo",
  share = "share",
  about = "about",
  terms = "terms",
  contact = "contact",
  doidiem = "doidiem",
}

export type CatProdListProps = {
  productsList: ProductListByCatInfo;
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

export enum BenefitKeys {
  freeShip = "freeShip",
  quality = "quality",
  save = "save",
  support = "support",
}
