export interface ProductBase {
  id: string | number;
  name: string;
  images: string[];
  catKey: string;
  price: number;
  discount?: number;
}

export interface ProductBaseItem {
  id: string;
  image: {
    sourceUrl?: string;
  };
  name: string;
  onSale: boolean;
  productCategories: {
    nodes: {
      slug?: string;
    }[];
  };
  productTags: {
    nodes: {
      slug?: string;
    }[];
  };
  sku: string;
  status: string;
  totalSales: number;
  type: string;
  visibleProducts: {
    nodes: {
      slug?: string;
      isRestricted?: boolean;
    }[];
  };
  manageStock?: number;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  soldIndividually?: string;
  weight?: string;
  width?: string;
  virtual?: string;
}

export interface ProductItem {
  id: string;
  image: string | null;
  name: string;
  onSale: boolean;
  productCategories: (string | undefined)[];
  productTags: (string | undefined)[];
  sku: string;
  status: string;
  totalSales: number;
  type: string;
  visibleProducts: {
    slug?: string;
    isRestricted?: boolean;
  }[];
  manageStock?: number;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  soldIndividually?: string;
  weight?: string;
  width?: string;
  virtual?: string;
}
